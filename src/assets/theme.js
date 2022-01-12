import { purple } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const primary = purple[500];

const defaultTheme = {
  palette: {
    type: 'dark',
    primary: {
      main: primary,
    },
    secondary: {
      main: '#fafafa',
    },
  },
};

export const theme = createTheme(defaultTheme);
