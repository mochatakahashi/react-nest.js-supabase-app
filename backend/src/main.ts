import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for your specific frontend URL
  app.enableCors({
    origin: [
      'https://mina-guestbook-frontend.vercel.app',
      'http://localhost:3001',
      'https://my-personal-website-six-nu.vercel.app',
      'http://localhost:5500',
      'http://localhost:3000'
    ], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // For Vercel, we listen on the port provided by the environment or 3000
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
