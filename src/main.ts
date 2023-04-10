import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adapter/redis.adapter.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adapter = new RedisIoAdapter(app);
  await adapter.connectToRedis();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useWebSocketAdapter(adapter);
  await app.listen(3000);
}
bootstrap();
