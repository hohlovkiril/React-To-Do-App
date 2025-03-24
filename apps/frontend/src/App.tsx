import Board from "./components/Board";
import { TaskboardProvider } from './hooks';

export default function App() {
  return (
    <>
      <TaskboardProvider>
        <Board />
      </TaskboardProvider>
    </>
  )
}