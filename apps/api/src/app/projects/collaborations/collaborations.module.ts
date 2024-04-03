import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/app/auth/auth.module';
import { CollaborationsController } from './collaborations.controller';
import { CollaborationsService } from './collaborations.service';
import { Collaboration } from './entities/collaboration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collaboration]), AuthModule],
  controllers: [CollaborationsController],
  providers: [CollaborationsService],
  exports: [TypeOrmModule],
})
export class CollaborationsModule {}
