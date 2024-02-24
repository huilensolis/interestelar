import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: ['Content-Type'],
      origin: [process.env.WEB_APP_ORIGIN ?? 'http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(cookieParser());

  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('Interestelar')
    .setDescription('Api specification')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const appPort = process.env.APP_PORT!;
  await app.listen(appPort);

  console.log(`app listen on http://localhost:${appPort}/api`);
}
bootstrap();
