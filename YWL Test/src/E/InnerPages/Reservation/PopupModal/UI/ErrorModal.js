import React from 'react';
import classes from './ErrorModal.module.css';

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

const ErrorModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <div className={classes.modal}>
      
        <div className={classes.content}>
          <p>modal</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.onConfirm}>X</Button>
        </footer>
      </div>
    </div>
  );
};

export default ErrorModal;
