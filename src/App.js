import './style/App.scss';
import './style/Player.scss';
import AppRouter from './AppRouter'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>🫂 How well do you know your people?</p>
      </header>
      <div className="App-screen">
        <AppRouter/>
      </div>
    </div>
  );
}

export default App;
