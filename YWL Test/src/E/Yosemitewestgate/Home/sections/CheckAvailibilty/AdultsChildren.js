import React, { useState, useEffect } from 'react';
import './checkavailibity.css';

const Counter = ({ counterData, counterIndex }) => {
  const initialStateCounter = {
    adultCounter: 0,
    childrenCounter: 0
  };
  const [{ adultCounter, childrenCounter }, setCounter] = useState(
    initialStateCounter
  );

  const [counterbtnDisabled, setCounterBtnDisabled] = useState(false);
  const [children, setChildren] = useState([]);

  const handlerCounter = (key, sign) => {
    if (
      (sign === 'minus' && adultCounter === 0 && key === 'adultCounter') ||
      (sign === 'minus' && childrenCounter === 0 && key === 'childrenCounter')
    ) {
      return;
    }
    if (
      (adultCounter === 5 && key === 'adultCounter' && sign === 'plus') ||
      (childrenCounter === 4 && key === 'childrenCounter' && sign === 'plus')
    ) {
      setCounterBtnDisabled(true);
      return;
    }
    setCounter(prevCounter => ({
      ...prevCounter,
      [key]: sign == 'plus' ? prevCounter[key] + 1 : prevCounter[key] - 1
    }));
    if (key === 'childrenCounter' && childrenCounter <= 4 && sign === 'plus') {
      setChildren(prevArray => [...prevArray, childrenCounter]);
    }
    if (key === 'childrenCounter' && childrenCounter <= 4 && sign === 'minus') {
      children.pop();

      setChildren(prevArray => [...prevArray]);
    }
  };
  return (
    <>
      <div className="margin-bottom-10 counter-heading">
        Counter - {counterIndex + 1}
      </div>
      <div className="counter-container margin-bottom-10">
        <span
          className="btn-small danger-button"
          onClick={() => handlerCounter('adultCounter', 'minus')}
          disabled={counterbtnDisabled}
        >
          -
        </span>
        <span className="counter-value">{adultCounter}</span>
        <span
          className="btn-small succes-button"
          onClick={() => handlerCounter('adultCounter', 'plus')}
          disabled={counterbtnDisabled}
        >
          +
        </span>
      </div>
      <div className="counter-container">
        <span
          className="btn-small danger-button"
          onClick={() => handlerCounter('childrenCounter', 'minus')}
          disabled={counterbtnDisabled}
        >
          -
        </span>
        <span className="counter-value">{childrenCounter}</span>
        <span
          className="btn-small succes-button"
          onClick={() => handlerCounter('childrenCounter', 'plus')}
          disabled={counterbtnDisabled}
        >
          +
        </span>
      </div>
      <div className="">
        {children.length > 0 &&
          children.map((data, index) => (
            <div className="age-col" key={index}>
              <p>Age</p>
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          ))}
      </div>
    </>
  );
};

export default function AdultsChid() {
  
  const initialState = [
    {
      adult: 0,
      children: 0
    }
  ];

//   const initialStatePerson = {
//     firstName: 'Anurag',
//     lastName: 'Hugar'
//   };

  const [roomsDetails, setRoomDetails] = useState(initialState);
  const [disabled, setDisbaled] = useState(true);

  const handlerAddRoom = () => {
    var objects = { adult: 0, children: 0 };
    setRoomDetails(array => [...array, objects]);
    setDisbaled(false);
  };

  const handlerDeleteRoom = () => {
    if (roomsDetails.length == 1) {
      setDisbaled(true);
      return;
    }
    roomsDetails.pop();
    setRoomDetails(array => [...array]);
  };

  useEffect(() => {
    if (roomsDetails.length == 1) {
      setDisbaled(true);
    }
  }, [roomsDetails]);
  return (
    
      <div className="container">
        {roomsDetails.map((data, index) => (
          <div className="col" key={index}>
            <Counter counterData={data} counterIndex={index} />
          </div>
        ))}
        <button
          className="btn-common danger-button margin-right-10"
          onClick={() => handlerDeleteRoom()}
          disabled={disabled}
        >
          {' '}
          Delete rooms
        </button>
        <button
          className="btn-common succes-button"
          onClick={() => handlerAddRoom()}
        >
          {' '}
          Add Additional Room
        </button>
      </div>
  
  );
}
