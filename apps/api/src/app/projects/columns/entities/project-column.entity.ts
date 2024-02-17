import { UUID } from 'crypto';
import { Project } from 'src/app/projects/base/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project-columns')
export class ProjectColumn {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column('text')
  name: string;

  @Column('text')
  emoji: string;

  @ManyToOne(() => Project, (project) => project.columns, {
    onDelete: 'CASCADE',
  })
  project: Project;
}
