import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#FC814A',
      contrastText: '#151515'
    },
    secondary: {
      main: '#f50057',
    },
    background: {
        default: '#cfeeed',
        paper: '#FBF5F3',
    },
    text: {
        primary: '#151515',
    },
  },
  typography: {
    fontFamily: 'Gochi Hand',
  },
});