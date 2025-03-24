import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps} from 'react-beautiful-dnd'
import { TaskType } from '../../common';

export type TaskItemProps = {
  ref: (element: HTMLElement | null) => void;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  draggableProps: DraggableProvidedDraggableProps;
  data: TaskType;
}