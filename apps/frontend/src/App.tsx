import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Board from "./components/Board";
import { TaskboardProvider } from './hooks';

export default function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TaskboardProvider>
          <Board />
        </TaskboardProvider>
      </LocalizationProvider>
    </>
  )
}