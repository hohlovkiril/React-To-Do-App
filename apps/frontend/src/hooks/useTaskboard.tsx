import React, { useState, useContext, createContext } from 'react';
import { ColumnType, TaskType } from "../common";

export type TaskboardApi = {
  state: ColumnType[];
  onChange: React.Dispatch<React.SetStateAction<ColumnType[]>>;
  onAddColumn: (newColumn: ColumnType) => void;
  onRemoveColumn: (columnId: number) => void;
  onAddTask: (newTask: TaskType, columnId: number) => void;
  onRemoveTask: (taskId: number) => void;
}

export type TaskboardProps = {
  children: React.ReactNode;
}

export const TaskboardContext = createContext<TaskboardApi | undefined>(undefined);

export const TaskboardProvider: React.FC<TaskboardProps> = ({ children }) => {
  const [state, setState] = useState<ColumnType[]>([]);

  const handleAddColumn = (newColumn: ColumnType) => {
    setState([...state, newColumn]);
  }

  const handleRemoveColumn = (columnId: number) => {
    setState([...state.filter((col) => col.id !== columnId)]);
  }

  const handleAddTask = (newTask: TaskType, columnId: number) => {
    const column = state.find((col) => col.id === columnId);
    const taskId = state.reduce((acc, col) => acc + col.task.length, 0) + 1;

    if (column) {
      setState(prev => prev.map((col) => ({
        ...col,
        task: col.id !== columnId
          ? col.task
          : [...col.task, { ...newTask, id: taskId, viewIndex: col.task.length }]
      })))
    }
  }

  const handleRemoveTask = (taskId: number) => {
    setState(prev => prev.map((col) => ({
      ...col,
      task: col.task.filter((task) => task.id !== taskId).map((task, key) => ({ ...task, viewIndex: key }))
    })))
  }
  
  return (
    <TaskboardContext.Provider
      value={{
        state,
        onChange: setState,
        onAddColumn: handleAddColumn,
        onRemoveColumn: handleRemoveColumn,
        onAddTask: handleAddTask,
        onRemoveTask: handleRemoveTask,
      }}
    >
      {children}
    </TaskboardContext.Provider>
  )
}

export const useTaskboard = () => {
  const context = useContext(TaskboardContext);

  if (!context) {
    throw new Error('useTaskboard hook must be wrapped in TaskboardProvider');
  }

  return context;
}