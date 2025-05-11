import { Controller, Get } from '@nestjs/common';
import { SlackBotService } from './slack-bot.service';

@Controller()
export class SlackBotController {
  constructor(private readonly slackBotService: SlackBotService) {}

  @Get()
  getHello(): string {
    return this.slackBotService.getHello();
  }
}
