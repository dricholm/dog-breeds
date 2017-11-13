import React from 'react';

const Input = (props) => (
  <input
    className="input"
    {...props.elementConfig}
    onChange={props.changed} />
);

export default Input;
