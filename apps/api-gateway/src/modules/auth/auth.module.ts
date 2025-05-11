import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { User } from './domain/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@shared';


""
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}), // boş bırak, strategy içinde kullanılacak
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
