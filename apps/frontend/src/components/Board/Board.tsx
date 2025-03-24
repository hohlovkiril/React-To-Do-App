import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Box, Button, Card, CardContent, IconButton, Stack, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel'

import { BoardContainer } from "./Board.style";
import Column from '../Column';
import { ColumnType, TaskType } from '../../common';
import { useTaskboard } from '../../hooks';

export default function Board() {

  /** Context */

  const { state, onChange, onAddColumn } = useTaskboard();

  /** States */

  const [formActive, setFormActive] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  
  /** Handlers */

  const handleOnClickAdd = () => {
    if (title.length === 0) return;

    const newColumn: ColumnType = {
      id: state.length + 1,
      viewIndex: state.length,
      title: title,
      task: [],
    };

    setFormActive(false);
    setTitle('');
    onAddColumn(newColumn);
  }

  const handleOnClickCancel = () => {
    setFormActive(false);
    setTitle('');
  }

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination, type } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === 'ColumnList') {
      if (destination.index > source.index) {
        onChange(prev => prev.map((col: ColumnType) => ({
          ...col,
          viewIndex: col.viewIndex === source.index
            ? destination.index
            : col.viewIndex <= destination.index && col.viewIndex > source.index
            ? col.viewIndex - 1 : col.viewIndex
        })))
      } else {
        onChange(prev => prev.map((col: ColumnType) => ({
          ...col,
          viewIndex: col.viewIndex === source.index
            ? destination.index
            : col.viewIndex >= destination.index && col.viewIndex < source.index
            ? col.viewIndex + 1 : col.viewIndex
        })))
      }
    } else if (type === 'TaskList') {
      const [sourceColumnInx] = source.droppableId.split('#').slice(2,3);
      const [destinationColumnInx] = destination.droppableId.split('#').slice(2, 3);

      if (sourceColumnInx === destinationColumnInx) {
        const column = state.find((col) => col.viewIndex === Number(sourceColumnInx));

        if (column) {
          if (destination.index > source.index) {
            onChange(prev => prev.map((col: ColumnType) => ({
              ...col,
              task: col.viewIndex !== column.viewIndex
                ? col.task
                : col.task.map((task: TaskType) => ({
                  ...task,
                  viewIndex: task.viewIndex === source.index
                    ? destination.index
                    : task.viewIndex <= destination.index && task.viewIndex > source.index
                    ? task.viewIndex - 1 : task.viewIndex,
                }))
            })))
          } else {
            onChange(prev => prev.map((col: ColumnType) => ({
              ...col,
              task: col.viewIndex !== column.viewIndex
                ? col.task
                : col.task.map((task: TaskType) => ({
                  ...task,
                  viewIndex: task.viewIndex === source.index
                    ? destination.index
                    : task.viewIndex >= destination.index && task.viewIndex < source.index
                    ? task.viewIndex + 1 : task.viewIndex,
                }))
            })))
          }
        }
      } else {
        const sourceColumn = state.find((col) => col.viewIndex === Number(sourceColumnInx));
        const destinationColumn = state.find((col) => col.viewIndex === Number(destinationColumnInx));

        if (sourceColumn && destinationColumn) {
          const sourceSliceStart = sourceColumn.task.sort((a, b) => a.viewIndex - b.viewIndex).slice(0, source.index);
          const sourceSlieEnd = sourceColumn.task.sort((a, b) => a.viewIndex - b.viewIndex).slice(source.index + 1);
          const sourceList = [...sourceSliceStart, ...sourceSlieEnd];
          const sourceTask = sourceColumn.task.find((task) => task.viewIndex === Number(result.draggableId.split('#')[3]))
          const destinationSliceStart = destinationColumn.task.sort((a, b) => a.viewIndex - b.viewIndex).slice(0, destination.index);
          const destinationSliceEnd = destinationColumn.task.sort((a, b) => a.viewIndex - b.viewIndex).slice(destination.index);
          if (sourceTask) {
            sourceTask.column = destinationColumn;
            const destinationList = [...destinationSliceStart, sourceTask, ...destinationSliceEnd];

            onChange(prev => prev.map((col: ColumnType) => ({
              ...col,
              task: col.viewIndex !== sourceColumn.viewIndex && col.viewIndex !== destinationColumn.viewIndex
                ? col.task
                : col.viewIndex === sourceColumn.viewIndex
                ? sourceList.map((task: TaskType, key) => ({ ...task, viewIndex: key }))
                : destinationList.map((task: TaskType, key) => ({ ...task, viewIndex: key }))
            })))
          }
        }
      }
    }
  }
  
  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
    >
      <Droppable
        droppableId="BOARD"
        type="ColumnList"
        direction="horizontal"
      >
        {(provided) => (
          <BoardContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {state.sort((a, b) => a.viewIndex - b.viewIndex).map((col, key) => (
              <Draggable
                key={key}
                draggableId={`DRAG#COLUMN#${col.id}#${col.viewIndex}`}
                index={key}
              >
                {(dragProvided) => (
                  <Column
                    ref={dragProvided.innerRef}
                    dragHandleProps={dragProvided.dragHandleProps}
                    draggableProps={dragProvided.draggableProps}
                    column={col}
                  />
                )}
              </Draggable>
            ))}

            {provided.placeholder}

            <Card
              sx={{
                margin: '0.5em 1em',
                width: '240px',
                background: 'rgb(250, 250, 250)'
              }}
            >
              <CardContent>
                {formActive ? (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.5em',
                      }}
                    >
                      <TextField
                        value={title}
                        onChange={(evt) => setTitle(evt.currentTarget.value)}
                        sx={{
                          background: 'white',
                        }}
                      />
                      <Stack
                        direction='row'
                        justifyContent='flex-end'
                        gap={1}
                      >
                        <IconButton
                          color='error'
                          size='small'
                          onClick={handleOnClickCancel}
                        >
                          <CancelIcon fontSize='small' />
                        </IconButton>
                        <Button
                          color='primary'
                          variant='contained'
                          sx={{
                            textTransform: 'none'
                          }}
                          onClick={handleOnClickAdd}
                        >
                          Add
                        </Button>
                      </Stack>
                    </Box>
                  </>
                ) : (
                  <Button
                    color='primary'
                    variant='outlined'
                    fullWidth
                    onClick={() => setFormActive(true)}
                    sx={{
                      textTransform: 'none',
                      borderStyle: 'dashed'
                    }}
                  >
                    Add Column
                  </Button>
                )}
              </CardContent>
            </Card>

          </BoardContainer>
        )}
      </Droppable>
    </DragDropContext>
  )
}