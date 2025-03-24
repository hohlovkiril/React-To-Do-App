import { useState } from 'react';
import { CardHeader, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { TaskItemContainer } from "./TaskItem.style";
import { TaskItemProps } from "./TaskItem.types";
import { useTaskboard } from '../../hooks';

export default function TaskItem(props: TaskItemProps) {

  /** Context */

  const { onRemoveTask } = useTaskboard();

  /** States */

  const [anchorEl, setAnchor] = useState<HTMLElement | null>(null);

  /** Handlers */

  const handleOpenMenu = (evt: React.MouseEvent<HTMLElement>) => {
    setAnchor(evt.currentTarget);
  }

  const handleCloseMenu = () => {
    setAnchor(null)
  }

  const handleOnClickEdit = () => {
    handleCloseMenu();
  }

  const handleOnClickDelete = () => {
    onRemoveTask(props.data.id);
    handleCloseMenu();
  }

  return (
    <>
      <TaskItemContainer
        ref={props.ref}
        {...props.dragHandleProps}
        {...props.draggableProps}
      >
        <CardHeader
          title={(
            <Typography
              sx={{
                cursor: 'pointer',
                width: '150px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
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
    </>
  )
}