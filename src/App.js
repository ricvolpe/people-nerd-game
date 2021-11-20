import AppRouter from './AppRouter'
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { theme } from './style/theme'
import { ThemeProvider } from '@mui/material/styles';
import './style/App.scss';


function App() {
  React.useEffect(() => {
    document.title = "Who tweeted that?"
  })
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <header className="App-header"></header>
          <div className="App-screen">
            <AppRouter />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
