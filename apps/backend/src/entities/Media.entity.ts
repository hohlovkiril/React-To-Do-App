import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from './Task.entity';

@Entity({
  name: 'media',
})
export class MediaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true, nullable: false })
  filename: string;

  @Column({ type: 'text', unique: false, nullable: false })
  filepath: string;

  /** Relatations */

  @ManyToOne(() => TaskEntity, (task) => task.media, { onDelete: 'CASCADE' })
  @JoinColumn()
  task: TaskEntity;
}
