import { UUID } from 'crypto';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../../base/entities';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column('text', {})
  tagName: string;

  @Column('text')
  color: string;

  @ManyToOne(() => Project, (project) => project.tags, {
    onDelete: 'CASCADE',
  })
  project: Project;
}
