import type { FC } from 'react';
import type { Theme } from '@emotion/react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { NoSsr } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { light } from './palette';

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

          '& input': {
            padding: '8px 14px',
          },
          '& p': {
            marginLeft: '0',
          },
        },
      },
    },
  },
});

const ThemeProvider: FC = ({ children }) => {
  return (
    <EmotionThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {/* FIX material ui ssr bug */}
        <NoSsr>{children}</NoSsr>
      </MuiThemeProvider>
    </EmotionThemeProvider>
  );
};

export default ThemeProvider;
