import AppRouter from './AppRouter'
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './style/theme'
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import './style/App.scss';
import React from 'react';

function App() {
  React.useEffect(() => {
    document.title = "Who tweeted that?"
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <Typography variant="h3">🫂 How well do you know your people?</Typography>
        </header>
        <div className="App-screen">
          <AppRouter />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
