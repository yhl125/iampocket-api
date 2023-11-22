import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://iampocket-wallet.vercel.app',
      'https://iampocket-wallet-git-develop-yhl125.vercel.app',
      'https://demo-app.iampocket.com',
      'https://dev-app.iampocket.com',
    ],
    methods: ['POST'],
    credentials: true,
  });

  await app.listen(8000, '0.0.0.0');
}
bootstrap();
