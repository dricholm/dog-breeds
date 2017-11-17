import React from 'react';

const input = props => {
  switch (props.elementType) {
    case 'input':
      return <input
        className="input"
        title={props.elementConfig.placeholder}
        {...props.elementConfig}
        onChange={props.changed} />;
    case 'checkbox':
      return (
        <label htmlFor={props.label} className="checkbox is-capitalized">
          <input
            onChange={props.changed}
            id={props.label}
            title={props.label}
            {...props.elementConfig}
            type="checkbox" />
          &nbsp;{props.label}&emsp;
        </label>
      )
    default:
      return null;
  }
};

export default input;
