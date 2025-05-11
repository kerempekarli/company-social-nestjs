import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import {
  AllExceptionsFilter,
  AppLogger,
  ResponseInterceptor,
} from '@shared';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(AppLogger));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT || 3000);
  console.log("APP WORKING ON ", process.env.BASE_URL)
  console.log("Login ", process.env.BASE_URL + "/auth/slack")
}
bootstrap();
