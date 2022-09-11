import './App.css';
import GameStart from './layouts/GameStart';
import Game from './layouts/Game';
import { useState, useEffect } from 'react';
import GameOver from './layouts/GameOver';

function App() {
  const [layout, setLayout] = useState('home');
  const [cardNumber, setCardNumber] = useState(6);
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

  const handleSubmit = (e, number) => {
    e.preventDefault();
    setCardNumber(number);
    setLayout('game');
  };

  const handleWin = (time, cardNames) => {
    setGameinfo({
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
      {layout === 'game' && <Game numberCards={cardNumber} handleWin={handleWin} />}
      {layout === 'gameOver' && <GameOver time={gameinfo.time} cards={gameinfo.cards} handlechange={handlechange} />}
    </div>
  );
}

export default App;
