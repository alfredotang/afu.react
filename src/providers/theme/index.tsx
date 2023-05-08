import type { Theme } from '@emotion/react'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@mui/material/styles'
import { NoSsr } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { light } from './palette'
import { GlobalFormStyle } from './globalFormStyle'

export const theme: Theme = createMuiTheme({
  palette: light,
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiAppBar: {
      defaultProps: {},
    },
    MuiRadio: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          border: '1px solid #DDDDDD',
          padding: '10px 16px',
          fontSize: '13px',
          boxSizing: 'border-box',
          borderBottom: '3px solid #C6D0DB',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: '1px solid #DDDDDD',
          padding: '18px 15px',
          fontSize: '13px',
          boxSizing: 'border-box',
          color: '#545F6A',
        },
        head: {
          backgroundColor: '#E3ECF6',
        },
        body: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          backgroundColor: '#fff',
          '& .Mui-focused': {
            // '& fieldset': {
            //   borderWidth: '1px !important',
            //   borderColor: 'unset !important',
            // },
          },

          '& input': {
            padding: '8px 14px',
          },
          '& textarea': {},
          '& p': {
            marginLeft: '0',
          },
          '& ::placeholder': {
            color: '#666',
            fontSize: '14px',
          },
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: 'primary',
      },
    },
  },
})

const ThemeProvider = ({ children }) => {
  return (
    <EmotionThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalFormStyle />
        {/* FIX material ui ssr bug */}
        <NoSsr>{children}</NoSsr>
      </MuiThemeProvider>
    </EmotionThemeProvider>
  )
}

export default ThemeProvider
