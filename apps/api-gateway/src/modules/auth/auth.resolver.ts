import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './domain/dto/login.input';
import { SignupCompleteInput } from './domain/dto/signup-complete.input';
import { User } from './domain/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '@shared';

@Resolver(() => User)
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => String)
    async login(@Args('input') input: LoginInput): Promise<string> {
        return this.authService.login(input);
    }

    @Mutation(() => String)
    async signupComplete(
        @Args('input') input: SignupCompleteInput,
    ): Promise<string> {
        return this.authService.completeSignup(input);
    }

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    me(@CurrentUser() user: User) {
        return user;
    }
}
