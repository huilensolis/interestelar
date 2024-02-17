import { UUID } from 'crypto';
import { User } from 'src/app/users/entities';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Tag } from '../../tags/entities/tag.entity';
import { ProjectColumn } from './project-column.entity';

@Entity('projects')
@Unique(['name', 'user'])
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column('text')
  name: string;

  @Column('text')
  emoji: string;

  @OneToMany(() => ProjectColumn, (column) => column.project, {
    cascade: true,
    eager: true,
  })
  columns: ProjectColumn[];

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(() => Tag, (tag) => tag.project, {
    eager: true,
    cascade: true,
  })
  tags: Tag[];
}
