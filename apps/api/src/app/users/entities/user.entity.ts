import { UUID } from 'crypto';
import { Project } from 'src/app/projects/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    unique: true,
  })
  username: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text', {
    default: '/default-user.png',
  })
  avatar: string;

  @Column('boolean', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(() => Project, (project) => project.user)
  projects: string[];
}
