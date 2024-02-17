import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ProjectsModule } from './base/projects.module';
import { ColumnsModule } from './columns/columns.module';
import { TagsModule } from './tags/tags.module';
//TODO:Add cookies httpOnly for auth
@Module({
  imports: [
    ProjectsModule,
    TagsModule,
    ColumnsModule,
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
        ],
      },
    ]),
  ],
})
export class ProjectsBaseModule {}
