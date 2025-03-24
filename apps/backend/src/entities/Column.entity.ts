import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from './Task.entity';

@Entity({
  name: 'column',
})
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  viewIndex: number;

  @Column({ type: 'text', nullable: false, unique: true })
  title: string;

  /** Relatations */

  @OneToMany(() => TaskEntity, (task) => task.column, { cascade: true })
  task: TaskEntity[];
}
