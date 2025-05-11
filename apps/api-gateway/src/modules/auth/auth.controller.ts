import {
    Controller,
    Get,
    Query,
    Res,
    BadRequestException,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { Response } from 'express';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Get('slack')
    async slackAuthUrl(): Promise<{ url: string }> {
      return this.authService.generateSlackAuthUrl();
    }
  
    @Get('slack/callback')
    async handleSlackCallback(
      @Query('code') code: string,
      @Res() res: Response,
    ) {
      if (!code) throw new BadRequestException('Missing code');
      const jwt = await this.authService.handleSlackCallback(code);
      return res.redirect(`https://your-frontend.app/auth/callback?token=${jwt}`);
    }
  }
  