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

  @Column('uuid', {
    array: true,
    default: [],
  })
  taskIds: UUID[];

  @ManyToOne(() => User, (user) => user.projects)
  user: User;
}
