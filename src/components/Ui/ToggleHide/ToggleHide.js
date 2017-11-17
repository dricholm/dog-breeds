import React from 'react';

const toggleHide = props => (
  <button
    className={props.shown ? 'button is-light' : 'button is-primary'}
    type="button"
    onClick={props.click}
    >
    {props.shown ? 'Hide' : 'Show'}
  </button>
);

export default toggleHide;
