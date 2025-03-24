import { TaskPriority } from '@lib/common'

export type ColumnType = {
  id: number;
  viewIndex: number;
  title: string;
  task: TaskType[];
}

export type TaskType = {
  id: number;
  viewIndex: number;
  title: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: Date;
  column?: ColumnType;
}