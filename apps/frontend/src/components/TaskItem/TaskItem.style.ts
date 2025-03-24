import { Card, Drawer, styled } from "@mui/material";

export const TaskItemContainer = styled(Card)(() => ({
  margin: '0em 0em 1.25em 0em',
  border: '1px solid rgba(100, 100, 100, .25)',
  borderRadius: '4px',
  background: 'white',
  boxShadow: 'none',
}))

export const TaskFormContainer = styled(Drawer)(() => ({
  '& .MuiBox-root': {
    minWidth: '300px',
    width: '400px',
    height: '100%',
    '& .MuiCard-root': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      height: '100%',
    },
    '& .MuiCardHeader-root': {
      maxHeight: '64px',
      '& .MuiCardHeader-content': {
        maxWidth: '70%',
        '& .MuiTypography-root': {
          fontWeight: '400',
          fontSize: 'clamp(14px, 2vw, 18px)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
      '& .MuiCardHeader-action': {
        marginLeft: 'auto',
      },
    },
    '& .MuiCardContent-root': {
      display: 'flex',
      maxHeight: 'calc(100vh - 64px)',
      overflowY: 'auto',

      '& .MuiBox-root': {
        padding: '0em 0em 2em 0em',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: '1.5em',
      },

      '& .MuiFormControl-root': {
        display: 'flex',
        flexDirection: 'column',
        gap: '.5em',

        '& .MuiFormLabel-root': {
          fontSize: 'clamp(10px, 2vw, 12px)',
        },
        '& .MuiFormControlLabel-root .MuiTypography-root': {
          fontSize: 'clamp(12px, 2vw, 14px)',
        },
        '& .MuiInputBase-root': {
          fontSize: 'clamp(12px, 2vw, 14px)!important'
        }
      }
    }
  }
}))