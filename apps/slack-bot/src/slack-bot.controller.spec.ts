import { Test, TestingModule } from '@nestjs/testing';
import { SlackBotController } from './slack-bot.controller';
import { SlackBotService } from './slack-bot.service';

describe('SlackBotController', () => {
  let slackBotController: SlackBotController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SlackBotController],
      providers: [SlackBotService],
    }).compile();

    slackBotController = app.get<SlackBotController>(SlackBotController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(slackBotController.getHello()).toBe('Hello World!');
    });
  });
});
