import type { Theme as MuiTheme } from '@material-ui/core/styles';
import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}
