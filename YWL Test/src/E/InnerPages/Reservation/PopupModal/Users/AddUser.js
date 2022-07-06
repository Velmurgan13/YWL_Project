import React, { useState } from 'react';


import PopModal from '../UI/PopModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const [error, setError] = useState();


  const Button = (props) => {
    return (
      <button
        className={classes.button}
        type={props.type || 'button'}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  };
  
  const addUserHandler = (event) => {
    event.preventDefault();
   
    if (true) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    
  };




  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <PopModal
          onConfirm={errorHandler}
        >

          <div style={'height: 300px'}>

          </div>
          </PopModal>
      )}
      <div className={classes.input}>
        <form onSubmit={addUserHandler}>
         
          <Button type="submit">Read more</Button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
