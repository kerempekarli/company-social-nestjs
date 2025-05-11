import { NestFactory } from '@nestjs/core';
import { SlackBotModule } from './slack-bot.module';

async function bootstrap() {
  const app = await NestFactory.create(SlackBotModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
