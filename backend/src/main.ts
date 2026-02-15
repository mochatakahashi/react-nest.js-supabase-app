import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // <--- THIS PERMITS THE FRONTEND TO CONNECT
  await app.listen(3000);
}
bootstrap();