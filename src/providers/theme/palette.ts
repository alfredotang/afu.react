import { PaletteOptions } from '@material-ui/core/styles/createPalette';

export const light: PaletteOptions = {
  mode: 'light',
  primary: {
    light: '#7fcacf',
    main: '#0da5ab',
    dark: '#00898b',
    contrastText: '#fff',
  },

  secondary: {
    light: '#ea9ab2',
    main: '#e3587e',
    dark: '#d03f65',
    contrastText: '#fff',
  },
  background: {
    paper: '#fff',
    default: '#F2EEE4',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
};
