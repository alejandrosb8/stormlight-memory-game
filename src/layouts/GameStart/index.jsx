import React from 'react';
import './gameStart.css';
import CARDS_LIST from './../../services/cardsList.json';

const maxLenght = CARDS_LIST.length;

export default function index({ handleSubmit }) {
  return (
    <>
      <p>.Life before death, Strength before weakness, Journey before destination</p>
      <form onSubmit={(event) => handleSubmit(event, document.getElementById('pairNumber').value)}>
        <div>
          <label htmlFor="pairNumber">{`Select number of pairs of cards (1-${maxLenght})`}</label>
          <input type="number" min={1} max={maxLenght} id="pairNumber" defaultValue={6} required />
        </div>
        <button type="submit">Game Start</button>
      </form>
    </>
  );
}
