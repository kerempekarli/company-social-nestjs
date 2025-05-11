import { Injectable } from '@nestjs/common';

@Injectable()
export class SlackBotService {
  getHello(): string {
    return 'Hello World!';
  }
}
