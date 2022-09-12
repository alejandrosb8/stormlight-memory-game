import { useState } from 'react';
import './gameStart.css';
import CARDS_LIST from './../../services/cardsList.json';

const maxLenght = CARDS_LIST.length;

export default function GameStart({ handleSubmit }) {
  const [unlimitedErrors, setUnlimitedErros] = useState(false);

  const handleUnlimited = (e) => {
    setUnlimitedErros(e.target.checked);
  };

  return (
    <>
      <p>.Life before death, Strength before weakness, Journey before destination</p>
      <form
        onSubmit={(event) =>
          handleSubmit(event, document.getElementById('pairNumber').value, document.getElementById('errorNumber').value, unlimitedErrors)
        }
      >
        <div>
          <label className="label-main" htmlFor="pairNumber">{`Select number of pairs of cards (1-${maxLenght})`}</label>
          <input type="number" min={1} max={maxLenght} id="pairNumber" defaultValue={6} required />
        </div>
        <div>
          <label className="label-main" htmlFor="errorNumber">{`Select maximum number of failures`}</label>
          {unlimitedErrors ? (
            <input type="number" min={1} id="errorNumber" className="disabled" required disabled />
          ) : (
            <input type="number" min={1} id="errorNumber" defaultValue={5} required />
          )}
          <div className="checkContainer">
            <input onChange={(e) => handleUnlimited(e)} type="checkbox" id="setErrorsInifinity" />
            <label className="label-check" htmlFor="setErrorsInifinity">
              Unlimited failures
            </label>
          </div>
        </div>
        <button type="submit">Game Start</button>
      </form>
    </>
  );
}
