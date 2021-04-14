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

const theme: Theme = createMuiTheme({
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
