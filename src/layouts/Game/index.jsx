import React, { useEffect, useState } from 'react';
import CARD_LIST from './../../services/cardsList.json';
import Card from './../../components/Card';
import './game.css';

const INIT_GAMESTATE = {
  pairsToWin: Infinity,
  clickTimes: 0,
  previusCard: undefined,
  cardsFound: [],
  gameOver: false,
};

export default function Game({ numberCards, handleWin }) {
  const [cards, setCards] = useState([]);
  const [time, setTime] = useState(0);

  const [game, setGame] = useState(INIT_GAMESTATE);

  useEffect(() => {
    let cardsToUse = shuffle(CARD_LIST).slice(0, numberCards);
    let doubleArray = cardsToUse.flatMap((card) => [card, card]);
    let cardsToPut = shuffle(doubleArray);
    setCards(cardsToPut);
    setGame({ ...game, pairsToWin: numberCards - 1 });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!game.gameOver) {
      const interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [game.gameOver]);

  const TimeString = (time) => {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;

    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return `${minutes}:${seconds}`;
  };

  const handleTimeOut = (cardOne, cardTwo) => {
    cardOne.classList.remove('rotate-card');
    cardTwo.classList.remove('rotate-card');
  };

  const handleCardClick = (e, id, idCard) => {
    if (!game.cardsFound.find((pair) => idCard === pair) && game.gameOver === false) {
      if (game.clickTimes < 1) {
        const card = document.getElementById(id);
        card.classList.add('rotate-card');
        setGame({ ...game, clickTimes: game.clickTimes + 1, previusCard: [idCard, id] });
      } else if (game.clickTimes === 1) {
        if (game.previusCard[1] !== id) {
          const card = document.getElementById(id);
          card.classList.add('rotate-card');

          if (game.previusCard[0] === idCard) {
            //console.log('correcto');

            document.getElementById(game.previusCard[1]).classList.add('card-done');
            card.classList.add('card-done');

            setGame({
              ...game,
              clickTimes: 0,
              pairsToWin: game.pairsToWin - 1,
              previusCard: undefined,
              cardsFound: [...game.cardsFound, idCard],
            });

            if (game.pairsToWin <= 0) {
              setGame({ ...game, gameOver: true });
              setTimeout(() => handleWin(document.getElementById('timer').textContent, [...new Set([...game.cardsFound, idCard])]), 1000);
            }
          } else {
            //console.log('incorrecto');
            setTimeout(() => handleTimeOut(document.getElementById(game.previusCard[1]), card), 1000);
            setGame({ ...game, clickTimes: 0, previusCard: undefined });
          }
        }
      } else {
        setGame({ ...game, clickTimes: 0, previusCard: undefined });
      }
    }
  };

  return (
    <div className="gameContainer">
      <h2 id="timer">{TimeString(time)}</h2>
      <div className="cardContainer">
        {cards.map((card, index) => {
          return <Card key={index} idCard={card.id} idElement={index} handleClick={handleCardClick} />;
        })}
      </div>
    </div>
  );
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
