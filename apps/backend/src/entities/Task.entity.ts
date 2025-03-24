import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ColumnEntity } from './Column.entity';
import { TaskPriority } from '@lib/common';
import { MediaEntity } from './Media.entity';

@Entity({
  name: 'task',
})
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  viewIndex: number;

  @Column({ type: 'text', nullable: false, unique: false })
  title: string;

  @Column({ type: 'text', nullable: true, unique: false })
  description: string;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.Low })
  priority: TaskPriority;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public duoDate: Date;

  /** Relatations */

  @OneToMany(() => MediaEntity, (media) => media.task, { cascade: true })
  media: MediaEntity[];

  @ManyToOne(() => ColumnEntity, (column) => column.task, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  column: ColumnEntity;
}
