import React from 'react';
import './card.css';
import CARD_LIST from './../../services/cardsList.json';

//let random = CARD_LIST.sort(() => 0.5 - Math.random()).slice(0, 4);

export default function index({ idCard, idElement, handleClick }) {
  const cardData = CARD_LIST.find((card) => card.id === idCard);
  const idThisElement = 'card_' + idElement;

  return (
    <div className="flip-card" onClick={(event) => handleClick(event, idThisElement, idCard)}>
      <div className="flip-card-inner" id={idThisElement}>
        <div className="flip-card-front">
          <img src="https://cutewallpaper.org/27/brandon-sanderson-phone-wallpaper/226015260.jpg" alt="Stormlight logo" />
        </div>
        <div className="flip-card-back">
          <img src={`/characters/${cardData.image.file}`} alt={`${cardData.name} from stormlight archive`} />
        </div>
      </div>
    </div>
  );
}
