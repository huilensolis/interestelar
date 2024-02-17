import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/app/auth/auth.module';
import { ProjectsModule } from '../base/projects.module';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { ProjectColumn } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectColumn]),
    AuthModule,
    ProjectsModule,
  ],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
