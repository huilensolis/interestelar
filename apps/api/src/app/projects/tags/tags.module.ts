import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/app/auth/auth.module';
import { ProjectsModule } from '../base/projects.module';
import { Tag } from './entities/tag.entity';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), ProjectsModule, AuthModule],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
