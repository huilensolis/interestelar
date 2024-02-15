import { UUID } from 'crypto';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';

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
