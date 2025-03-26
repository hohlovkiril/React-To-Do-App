import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, FormControlLabel, FormLabel, IconButton, Menu, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { TaskFormContainer, TaskItemContainer } from "./TaskItem.style";
import { TaskFormProps, TaskItemProps } from "./TaskItem.types";
import { useTaskboard } from '../../hooks';
import { ColumnType } from '../../common';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { ColumnApi } from '../../services';

export function TaskItem(props: TaskItemProps) {

  /** Context */

  const { onSelectEditTask, onRemoveTask } = useTaskboard();

  /** States */

  const [anchorEl, setAnchor] = useState<HTMLElement | null>(null);
  const [drawer, setDrawer] = useState<boolean>(false);

  /** Handlers */

  const handleOpenMenu = (evt: React.MouseEvent<HTMLElement>) => {
    setAnchor(evt.currentTarget);
  }

  const handleCloseMenu = () => {
    setAnchor(null)
  }

  const handleOnClickEdit = () => {

    handleOnOpenDrawer();
    handleCloseMenu();
  }

  const handleOnClickDelete = () => {
    onRemoveTask(props.data.id);
    handleCloseMenu();
  }

  const handleOnOpenDrawer = () => {
    onSelectEditTask(props.data.id);
    setDrawer(true);
  }

  const handleOnCloseDrawer = () => {
    setDrawer(false);
  }

  return (
    <>
      <TaskItemContainer
        ref={props.ref}
        {...props.dragHandleProps}
        {...props.draggableProps}
        sx={{
          borderColor: props.data.priority === 0
            ? 'blue'
            : props.data.priority === 1
            ? 'orange' : 'red'
        }}
      >
        <CardHeader
          title={(
            <Typography
              sx={{
                cursor: 'pointer',
                width: '120px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: '300',
                fontSize: 'clamp(8px, 2vw, 12px)',
                whiteSpace: 'nowrap',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
              onClick={handleOnOpenDrawer}
            >
              {props.data.title}
            </Typography>
          )}
          action={(
            <IconButton
              size='small'
              onClick={handleOpenMenu}
            >
              <MoreVertIcon fontSize='small' />
            </IconButton>
          )}
        />
      </TaskItemContainer>
      
      <Menu
        id={`menu-task-${props.data.id}`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={handleOnClickEdit}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={handleOnClickDelete}
        >
          Delete
        </MenuItem>
      </Menu>

      <TaskForm
        open={drawer}
        onClose={handleOnCloseDrawer}
        onDelete={handleOnClickDelete}
      />
    </>
  )
}

export function TaskForm(props: TaskFormProps) {

  /** Context */

  const { selectedEditTask, onUpdateTask } = useTaskboard();

  /** States */

  const [form, setForm] = useState<{
    title: string,
    description?: string;
    priority?: number;
    dueDate?: Date;
    column?: ColumnType;
  }>({
    title: '',
  })
  const [columns, setColumns] = useState<ColumnType[]>([]);

  /** Handles */

  const handleAutoSave = () => {
    if (form && selectedEditTask) {
      onUpdateTask(selectedEditTask.id, { ...form, columnId: form.column?.id });
    }
  }

  /** Effects */

  useEffect(() => {
    if (selectedEditTask) {
      setForm({ ...selectedEditTask })
    }
  }, [
    selectedEditTask
  ])

  useEffect(() => {
    ColumnApi.getMany()
      .then((data) => setColumns(data))
  }, [

  ])

  if (!selectedEditTask) return;
  
  return (
    <TaskFormContainer
      open={props.open}
      anchor='right'
      onClose={props.onClose}
    >
      <Box>
        <Card>
          <CardHeader
            title={(
              <Typography>
                {selectedEditTask.title}
              </Typography>
            )}
            action={(
              <Stack
                direction='row'
                justifyContent='flex-end'
                gap={.25}
              >
                <IconButton
                  color='error'
                  onClick={props.onDelete}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={props.onClose}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
            )}
          />
          <Divider />
          <CardContent>
            <Box>
                
              <FormControl>
                <FormLabel htmlFor='task-title'>Title</FormLabel>
                <TextField
                  variant='outlined'
                  size='small'
                  value={form.title}
                  onChange={(evt) => setForm({ ...form, title: evt.currentTarget.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='task-priority'>Prioritize</FormLabel>
                <RadioGroup
                  row
                  value={form.priority}
                  onChange={(evt) => setForm({ ...form, priority: Number(evt.target.value) })}
                >
                  <FormControlLabel
                    value={0}
                    control={<Radio size='small' color='primary' />}
                    label="Low"
                    color='primary'
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio size='small' color='warning' />}
                    label="Medium"
                    color='warning'
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio size='small' color='error' />}
                    label="High"
                    color='error'
                  />
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='tas-due-date'>Due Date</FormLabel>
                <DatePicker
                  value={dayjs(form.dueDate) || undefined}
                  onChange={(evt) => evt ? setForm({ ...form, dueDate: new Date(evt.toString()) }) : null}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='task-description'>Description</FormLabel>
                <TextField
                  variant='outlined'
                  size='small'
                  multiline
                  rows={4}
                  value={form.description}
                  onChange={(evt) => setForm({ ...form, description: evt.currentTarget.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='task-state'>State</FormLabel>
                <Select
                  size='small'
                  value={form.column?.id}
                  onChange={(evt) => {
                    const column = columns.find((col) => col.id === Number(evt.target.value));

                    if (column) {
                      setForm({ ...form, column })
                    }
                  }}
                >
                  {columns.map((col, key) => (
                    <MenuItem
                      key={key}
                      value={col.id}
                    >
                      {col.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='task-media'>Attachments</FormLabel>

                <Stack
                  direction='column'
                  justifyContent='center'
                  alignItems='center'
                  sx={{
                    width: '64px',
                    height: '64px',
                    border: '1px dashed rgb(140, 140, 140)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    color: 'rgb(140, 140, 140)',
                    transition: '.1s ease-in-out',
                    '&:hover': {
                      borderColor: 'rgb(100, 100, 100)',
                      color: 'rgb(100, 100, 100)',
                    }
                  }}
                >
                  <CameraAltIcon />
                </Stack>
              </FormControl>

              <Button
                color='primary'
                variant='contained'
                fullWidth
                onClick={() => {
                  props.onClose();
                  handleAutoSave();
                }}
              >
                Save
              </Button>

            </Box>
          </CardContent>
        </Card>
      </Box>
    </TaskFormContainer>
  )
}