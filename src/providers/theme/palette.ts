import { PaletteOptions } from '@material-ui/core/styles/createPalette';

export const light: PaletteOptions = {
  mode: 'light',
  primary: {
    light: '#7ccaff',
    main: '#1a9ffa',
    dark: '#004a82',
    contrastText: '#fff',
  },

  secondary: {
    light: '#9f80ff',
    main: '#531aff',
    dark: '#1f0082',
    contrastText: '#fff',
  },
  background: {
    paper: '#fff',
    default: '#f6f6f6',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
};
