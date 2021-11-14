import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1bdaaa',
      contrastText: '#426484'
    },
    secondary: {
      main: '#f50057',
    },
    background: {
        default: '#FCF9BD',
        paper: '#FBF5F3',
    },
    text: {
        primary: '#426484',
    },
  },
  typography: {
    fontFamily: 'Zen Kaku Gothic New',
  },
});