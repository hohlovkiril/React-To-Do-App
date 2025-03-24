import { Draggable } from 'react-beautiful-dnd'
import { TaskInnerListContainer, TaskOutterListContainer } from "./TaskList.style";
import { TaskInnerListProps, TaskOutterListProps } from "./TaskList.types";
import TaskItem from '../TaskItem';

export function TaskOutterList(props: TaskOutterListProps) {
  return (
    <TaskOutterListContainer
      ref={props.ref}
      {...props.droppableProps}
    >
      {props.children}
    </TaskOutterListContainer>
  )
}

export function TaskInnerList(props: TaskInnerListProps) {

  /** Vars */

  const data = props.data.sort((a, b) => a.viewIndex - b.viewIndex);

  return (
    <TaskInnerListContainer>
      {data.map((task, key) => (
        <Draggable
          key={task.id}
          draggableId={`DRAG#TASK#${task.id}#${task.viewIndex}`}
          index={key}
        >
          {(dragProvided) => (
            <TaskItem
              ref={dragProvided.innerRef}
              dragHandleProps={dragProvided.dragHandleProps}
              draggableProps={dragProvided.draggableProps}
              data={task}
            />
          )}
        </Draggable>
      ))}
    </TaskInnerListContainer>
  )
}