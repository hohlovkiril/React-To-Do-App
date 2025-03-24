import { TaskPriority } from '@lib/common';

export class TaskGetManyDto {
  columnId?: number;
}

export class TaskCreateDto {
  title: string;
  columnId: number;
  viewIndex: number;
}

export class TaskUpdateDto {
  columnId?: number;
  title?: string;
  description?: string;
  viewIndex?: number;
  priority?: TaskPriority;
  dueDate?: Date;
}
