import React from 'react';
import './gameOver.css';
import CARDS_LIST from './../../services/cardsList.json';

export default function GameOver({ gameOverInfo, handlechange }) {
  const { time, cards, errors, isWin } = gameOverInfo;
  return (
    <div className="container">
      {isWin ? <h2>You won!</h2> : <h2>You lose!</h2>}

      <div className="container__buttons">
        <button onClick={(e) => handlechange(e, 'home')}>Home</button>
        <button onClick={(e) => handlechange(e, 'game')}>Replay</button>
      </div>
      <h3>{`Time: ${time}`}</h3>
      <h3>{`Errors: ${errors}`}</h3>
      <h3 className="image__title">Used images</h3>
      <div className="image__container">
        {cards.map((card, index) => {
          const cardinfo = CARDS_LIST.find((thiscard) => thiscard.id === card);
          return (
            <picture key={index}>
              <img src={`${process.env.PUBLIC_URL}/characters/${cardinfo.image.file}`} alt={`${cardinfo.name} from Stormlight Archive`} />
              <span>
                <a href={`https://coppermind.net/wiki/${cardinfo.coppermind}`} target="_blank" rel="noreferrer">
                  {cardinfo.name}
                </a>
              </span>
            </picture>
          );
        })}
      </div>
    </div>
  );
}
