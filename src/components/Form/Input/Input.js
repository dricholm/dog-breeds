import React from 'react';

const Input = (props) => {
  switch (props.elementType) {
    case 'input':
      return <input
        className="input"
        {...props.elementConfig}
        onChange={props.changed} />;
    case 'checkbox':
      return (
        <label className="checkbox is-capitalized">
          <label className="checkbox" defaultChecked>
            <input
              onChange={props.changed}
              {...props.elementConfig}
              type="checkbox" />
            &nbsp;{props.label}&emsp;
          </label>
        </label>
      )
    default:
      return null;
  }
};

export default Input;
