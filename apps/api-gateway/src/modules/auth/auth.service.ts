import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginInput } from './domain/dto/login.input';
import { SignupCompleteInput } from './domain/dto/signup-complete.input';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { User, UserRole, UserStatus } from './domain/entities/user.entity';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly config: ConfigService,
    ) { }

    private signToken(user: User): string {
        const secret = this.config.get<string>('jwt.secret');
        if (!secret) {
            throw new Error('JWT_SECRET is missing in config.');
        }

        return jwt.sign(
            { sub: user.id, email: user.email, role: user.role },
            secret,
            { expiresIn: '7d' },
        );
    }


    async login(input: LoginInput): Promise<string> {
        const user = await this.userRepo.findOne({ where: { email: input.email } });
        if (!user || !user.passwordHash) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(input.password, user.passwordHash);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');

        return this.signToken(user);
    }

    async completeSignup(input: SignupCompleteInput): Promise<string> {
        const user = await this.userRepo.findOne({
            where: { id: input.token }, // token = user.id veya başka ID olabilir
        });

        if (!user) throw new BadRequestException('Invalid token');

        user.passwordHash = await bcrypt.hash(input.password, 10);
        user.status = UserStatus.ACTIVE;
        await this.userRepo.save(user);

        return this.signToken(user);
    }

    async generateSlackAuthUrl(): Promise<{ url: string }> {
        const clientId = this.config.get('slack.clientId');
        const redirectUri = `${this.config.get('BASE_URL')}/auth/slack/callback`;

        const url = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=users:read,channels:read,chat:write&redirect_uri=${redirectUri}`;
        return { url };
    }

    async handleSlackCallback(code: string): Promise<string> {
        const clientId = this.config.get('slack.clientId');
        const clientSecret = this.config.get('slack.clientSecret');
        const redirectUri = `${this.config.get('BASE_URL')}/auth/slack/callback`;
        console.log('code:', code);
        console.log('clientId:', clientId);
        console.log('clientSecret:', clientSecret);
        console.log('redirectUri:', redirectUri);


        const { data: tokenRes } = await axios.post(
            'https://slack.com/api/oauth.v2.access',
            null,
            {
                params: {
                    client_id: clientId,
                    client_secret: clientSecret,
                    code,
                    redirect_uri: redirectUri,
                },
            },
        );
        console.log('Slack token response:', tokenRes);

        if (!tokenRes.ok) {
            console.error('Slack OAuth failed:', tokenRes);
            throw new Error('Slack OAuth failed');
        }


        const slackUserId = tokenRes.authed_user.id;
        const accessToken = tokenRes.access_token; // ✅ düzeltildi

        const { data: userInfo } = await axios.get('https://slack.com/api/users.info', {
            params: { user: slackUserId },
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log('Slack userInfo:', userInfo);


        const slackUser = userInfo.user;
        if (!slackUser?.profile?.email) {
            console.error('Slack user info missing email:', slackUser);
            throw new Error('Email not available from Slack profile');
        }
        const email = slackUser.profile.email;

        let user = await this.userRepo.findOne({ where: { email } });
        if (!user) {
            user = this.userRepo.create({
                email,
                name: slackUser.real_name,
                profileImage: slackUser.profile.image_192,
                role: UserRole.EMPLOYEE,
                status: UserStatus.ACTIVE,
                companyId: 'manual-temp', // TODO: Slack workspace → company eşleşmesi yapılmalı
            });
            await this.userRepo.save(user);
        }

        return this.signToken(user);
    }
}
