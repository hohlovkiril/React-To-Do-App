import { Card, styled } from "@mui/material";

export const ColumnContainer = styled(Card)(() => ({
  margin: '0.5em 1em',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: '240px',
  maxWidth: '240px',
  background: 'rgb(250, 250, 250)'
}))