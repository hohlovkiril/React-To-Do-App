import React, { useState, useContext, createContext, useEffect, useCallback } from 'react';
import { ColumnType, TaskType } from "../common";
import { ColumnApi, TaskApi } from '../services';

export type TaskboardApi = {
  state: ColumnType[];
  selectedEditTask?: TaskType;
  onChange: React.Dispatch<React.SetStateAction<ColumnType[]>>;
  onAddColumn: (newColumn: ColumnType) => void;
  onUpdateColumn: (columnId: number, title: string) => void;
  onRemoveColumn: (columnId: number) => void;
  onSelectEditTask: (taskId: number) => void;
  onAddTask: (newTask: TaskType, columnId: number) => void;
  onUpdateTask: (taskId: number, payload: {
    title?: string;
    description?: string;
    viewIndex?: number;
    priority?: number;
    dueDate?: Date;
    columnId?: number;
  }) => void;
  onRemoveTask: (taskId: number) => void;
  setLoaded: () => void;
}

export type TaskboardProps = {
  children: React.ReactNode;
}

export const TaskboardContext = createContext<TaskboardApi | undefined>(undefined);

export const TaskboardProvider: React.FC<TaskboardProps> = ({ children }) => {

  /** States */

  const [state, setState] = useState<ColumnType[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskType | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);

  /** Handlers */

  const handleAddColumn = (newColumn: ColumnType) => {
    ColumnApi.create({ title: newColumn.title, viewIndex: newColumn.viewIndex })
      .then((data) => setState([...state, { ...data, task: [] }]));
  }

  const handleUpdateColumn = (columnId: number, title: string) => {
    ColumnApi.update(columnId, { title })
      .finally(() => setLoaded(false));
  }

  const handleRemoveColumn = (columnId: number) => {
    ColumnApi.remove(columnId)
      .then(() => setState([...state.filter((col) => col.id !== columnId).map((_, key) => ({ ..._, viewIndex: key }))]))
      .finally(handleUpdateDatabase);
  }

  const handleSelectEditTask = (taskId: number) => {
    TaskApi.getOne(taskId)
      .then((data) => setSelectedTask(data));
  }

  const handleAddTask = (newTask: TaskType, columnId: number) => {
    const column = state.find((col) => col.id === columnId);

    if (column) {
      TaskApi.create({ title: newTask.title, viewIndex: column.task.length, columnId, })
        .then((data) => setState(prev => prev.map((col) => ({
          ...col,
          task: col.id !== columnId
            ? col.task
            : [...col.task, { ...data }]
        }))))
    }
  }

  const handleUpdateTask = (taskId: number, payload: {
    title?: string;
    description?: string;
    viewIndex?: number;
    priority?: number;
    dueDate?: Date;
    columnId?: number;
  }) => {
    TaskApi.update(taskId, payload)
      .finally(() => setLoaded(false));
  }

  const handleRemoveTask = (taskId: number) => {
    TaskApi.remove(taskId)
      .then(() => setState(prev => prev.map((col) => ({
        ...col,
        task: col.task.filter((_) => _.id !== taskId).map((_, key) => ({ ..._, viewIndex: key }))
      }))))
      .finally(handleUpdateDatabase);
  }

  const handleUpdateDatabase = useCallback(() => {
    console.log('update')
    console.table(state.sort((a, b) => a.viewIndex - b.viewIndex))
    for (let i = 0; i < state.length; i++) {
      const column = state[i];

      ColumnApi.update(column.id, { ...column })
        .then(() => {
          for (let j = 0; j < column.task.length; j++) {
            const task = column.task[j];

            TaskApi.update(task.id, { ...task, columnId: task.column?.id })
          }
        })
        .catch((err) => console.log(err))
    }
  }, [
    state
  ])

  /** Effects */

  useEffect(() => {
    if (!loaded) {
      ColumnApi.getMany()
        .then((data) => setState(data))
        .catch((err) => console.log(err))
        .finally(() => setLoaded(true));
    } else {
      handleUpdateDatabase();
    }
  }, [
    state,
    loaded,
    handleUpdateDatabase,
  ])

  console.table(state.sort((a, b) => a.viewIndex - b.viewIndex))
  
  return (
    <TaskboardContext.Provider
      value={{
        state: state.sort((a, b) => a.viewIndex - b.viewIndex),
        selectedEditTask: selectedTask,
        onChange: setState,
        onAddColumn: handleAddColumn,
        onUpdateColumn: handleUpdateColumn,
        onRemoveColumn: handleRemoveColumn,
        onSelectEditTask: handleSelectEditTask,
        onAddTask: handleAddTask,
        onUpdateTask: handleUpdateTask,
        onRemoveTask: handleRemoveTask,
        setLoaded: () => setLoaded(false)
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