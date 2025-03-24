import { DroppableProvidedProps } from 'react-beautiful-dnd'
import { TaskType } from '../../common';

export type TaskOutterListProps = {
  ref: (element: HTMLElement | null) => void;
  droppableProps: DroppableProvidedProps;
  children: React.ReactNode;
}

export type TaskInnerListProps = {
  data: TaskType[];
}