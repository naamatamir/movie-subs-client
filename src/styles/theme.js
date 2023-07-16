import { createTheme } from '@mui/material';

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#845adf',
    },
    primaryLight: {
      background: '#efeafb',
    },
    secondary: {
      main: '#23b7e5',
    },
    danger: {
      main: '#f44336',
    },
    dangerLight: {
      main: '#fde9e7',
    },
    background: {
      default: '#f3f1f8',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
