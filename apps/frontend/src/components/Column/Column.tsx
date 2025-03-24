import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd'
import { Box, Button, CardContent, CardHeader, IconButton, Stack, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import CancelIcon from '@mui/icons-material/Cancel'

import { ColumnContainer } from "./Column.style";
import { ColumnProps } from "./Column.types";
import { TaskInnerList, TaskOutterList } from '../TaskList';
import { useTaskboard } from '../../hooks';

export default function Column(props: ColumnProps) {

  /** Context */

  const { onRemoveColumn, onAddTask } = useTaskboard();

  /** States */

  const [formActive, setFormActive] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  /** Handlers */

  const handleOnClickAdd = () => {
    setFormActive(false);
    setTitle('');
    onAddTask({ id: 0, viewIndex: 0, title }, props.column.id)
  }

  const handleOnClickCancel = () => {
    setFormActive(false);
    setTitle('');
  }

  return (
    <ColumnContainer
      ref={props.ref}
      {...props.dragHandleProps}
      {...props.draggableProps}
    >
      <CardHeader
        title={(
          <Typography>
            {props.column.title}
          </Typography>
        )}
        action={(
          <IconButton
            color='error'
            onClick={() => onRemoveColumn(props.column.id)}
          >
            <DeleteIcon />
          </IconButton>
        )}
      />
      <CardContent
        sx={{
          paddingTop: '0',
        }}
      >
        <Droppable
          droppableId={`DROP#COLUMN#${props.column.viewIndex}`}
          direction='vertical'
          type='TaskList'
          ignoreContainerClipping={true}
          isCombineEnabled={true}
        >
          {(dropProvided) => (
            <TaskOutterList
              ref={dropProvided.innerRef}
              droppableProps={dropProvided.droppableProps}
            >
              <TaskInnerList
                data={props.column.task}
              />

              {dropProvided.placeholder}
              
              {formActive ? (
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
              ) : (
                <Button
                  color='primary'
                  variant='outlined'
                  fullWidth
                  sx={{
                    textTransform: 'none',
                    borderStyle: 'dashed'
                  }}
                  onClick={() => setFormActive(true)}
                >
                  Add Task
                </Button>
              )}
            </TaskOutterList>
          )}
        </Droppable>
      </CardContent>
    </ColumnContainer>
  )
}