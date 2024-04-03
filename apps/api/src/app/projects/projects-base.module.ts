import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ProjectsModule } from './base/projects.module';
import { CollaborationsModule } from './collaborations/collaborations.module';
import { ColumnsModule } from './columns/columns.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ProjectsModule,
    TagsModule,
    ColumnsModule,
    CollaborationsModule,
    RouterModule.register([
      {
        path: 'projects',
        module: ProjectsModule,
        children: [
          {
            path: 'tags',
            module: TagsModule,
          },
          {
            path: 'columns',
            module: ColumnsModule,
          },
          {
            path: 'collaborations',
            module: CollaborationsModule,
          },
        ],
      },
    ]),
  ],
})
export class ProjectsBaseModule {}
