import type { FC } from 'react';
import type { Theme } from '@emotion/react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
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
  },
});

const ThemeProvider: FC = ({ children }) => {
  return (
    <EmotionThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </EmotionThemeProvider>
  );
};

export default ThemeProvider;
