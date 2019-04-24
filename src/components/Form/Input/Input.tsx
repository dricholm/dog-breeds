import React from 'react';

export interface InputProps {
  elementConfig: any;
  elementType: string;
  label?: string;
  touched?: boolean;
}

const input = (props: InputProps) => {
  switch (props.elementType) {
    case 'input':
      return (
        <input
          className="input"
          title={props.elementConfig.placeholder}
          {...props.elementConfig}
        />
      );

    case 'checkbox': {
      const checkboxClasses = [
        'checkbox',
        'is-capitalized',
        'is-medium',
        'tag',
      ];
      if (
        typeof props.elementConfig !== 'undefined' &&
        props.elementConfig.checked
      ) {
        checkboxClasses.push('is-info');
      }
      return (
        <label
          htmlFor={props.label}
          className={checkboxClasses.join(' ')}
          style={{ margin: '0.3em' }}
        >
          <input
            id={props.label}
            title={props.label}
            {...props.elementConfig}
            type="checkbox"
          />
          &nbsp;
          {props.label}
        </label>
      );
    }

    default:
      return null;
  }
};

export default input;
