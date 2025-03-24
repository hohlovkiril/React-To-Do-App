import { Box, styled } from "@mui/material";

export const TaskOutterListContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: 'fit-content',
}))

export const TaskInnerListContainer = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: 'fit-content',
}))