import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CEnvSchema } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (envs) => CEnvSchema.parse(envs),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
