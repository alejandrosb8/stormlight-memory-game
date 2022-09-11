import React from 'react';
import './gameOver.css';
import CARDS_LIST from './../../services/cardsList.json';

export default function GameOver({ time, cards, handlechange }) {
  return (
    <div className="container">
      <h2>You won!</h2>

      <div className="container__buttons">
        <button onClick={(e) => handlechange(e, 'home')}>Home</button>
        <button onClick={(e) => handlechange(e, 'game')}>Replay</button>
      </div>
      <h3>{`Time: ${time}`}</h3>
      <h3 className="image__title">Used images</h3>
      <div className="image__container">
        {cards.map((card, index) => {
          const cardinfo = CARDS_LIST.find((thiscard) => thiscard.id === card);
          return (
            <picture key={index}>
              <img src={`./../../../public/characters/${cardinfo.image.file}`} alt={`${cardinfo.name} from Stormlight Archive`} />
              <span>{cardinfo.name}</span>
            </picture>
          );
        })}
      </div>
    </div>
  );
}
