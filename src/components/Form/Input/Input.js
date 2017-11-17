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
      const checkboxClasses = ['checkbox', 'is-capitalized', 'is-medium', 'tag'];
      if (props.elementConfig.checked) {
        checkboxClasses.push('is-info');
      }
      return (
        <label htmlFor={props.label} className={checkboxClasses.join(' ')} style={{margin: '0.3em'}}>
          <input
            onChange={props.changed}
            id={props.label}
            title={props.label}
            {...props.elementConfig}
            type="checkbox" />
          &nbsp;{props.label}
        </label>
      )
    default:
      return null;
  }
};

export default input;
