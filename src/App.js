import './App.css';
import GameStart from './layouts/GameStart';
import Game from './layouts/Game';
import { useState, useEffect } from 'react';
import GameOver from './layouts/GameOver';

function App() {
  const [layout, setLayout] = useState('home');
  const [gameStarted, setGameStarted] = useState({
    numberCards: 0,
    errorsNumber: 0,
    isUnlimited: false,
  });
  const [gameinfo, setGameinfo] = useState({
    time: 0,
    cards: [],
  });

  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = '';
    });
  }, []);

  const handleSubmit = (e, number, erros, unlimited) => {
    e.preventDefault();
    setGameStarted({
      ...gameStarted,
      numberCards: number,
      errorsNumber: erros,
      isUnlimited: unlimited,
    });
    setLayout('game');
  };

  const handleGameOver = (isWin, errors, time, cardNames) => {
    setGameinfo({
      isWin: isWin,
      errors: errors,
      time: time,
      cards: cardNames,
    });
    setLayout('gameOver');
  };

  const handlechange = (e, newLayout) => {
    setLayout(newLayout);
  };

  return (
    <div className="App">
      <h1>Stormlight Archive Memory Game</h1>
      {layout === 'home' && <GameStart handleSubmit={handleSubmit} />}
      {layout === 'game' && <Game gameStartInfo={gameStarted} handleGameOver={handleGameOver} />}
      {layout === 'gameOver' && <GameOver gameOverInfo={gameinfo} handlechange={handlechange} />}
    </div>
  );
}

export default App;
