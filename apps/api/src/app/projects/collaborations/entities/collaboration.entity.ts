import { UUID } from 'crypto';
import { User } from 'src/app/users/entities';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../../base/entities';

@Entity('collaborations')
export class Collaboration {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToMany(() => User, (user) => user.collaborations)
  collaborators: User[];

  @ManyToMany(() => Project, (project) => project.collaboration)
  projects: Project[];

  @Column('enum', {
    enum: ['active', 'pending', 'inactive'],
    default: 'pending',
  })
  status: 'active' | 'pending' | 'inactive';

  @Column('enum', {
    enum: ['member', 'owner', 'moderator'],
    default: 'member',
  })
  role: 'member' | 'owner' | 'moderator';
}
