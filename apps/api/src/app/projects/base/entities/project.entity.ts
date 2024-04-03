import { UUID } from 'crypto';
import { ProjectColumn } from 'src/app/projects/columns/entities';
import { Tag } from 'src/app/projects/tags/entities/tag.entity';
import { User } from 'src/app/users/entities';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Collaboration } from '../../collaborations/entities/collaboration.entity';

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

  @ManyToMany(() => Collaboration, (collaboration) => collaboration.projects, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  collaboration: Collaboration;
}
