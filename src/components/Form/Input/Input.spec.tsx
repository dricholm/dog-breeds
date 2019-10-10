import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Input from './Input';

describe('<Input />', () => {
  it('should work with input text', () => {
    const onChange = jest.fn();
    const elementConfig = {
      onChange,
      placeholder: 'Placeholder test',
      type: 'text',
    };
    const elementType = 'input';
    const utils = render(
      <Input elementType={elementType} elementConfig={elementConfig} />
    );

    const inputElement = utils.getByPlaceholderText(
      elementConfig.placeholder
    ) as HTMLInputElement;
    expect(onChange).toHaveBeenCalledTimes(0);
    fireEvent.change(inputElement, { target: { value: 'Entering' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(inputElement).toHaveValue('Entering');
  });

  it('should work with checkbox', () => {
    const onChange = jest.fn();
    const elementConfig = {
      onChange,
    };
    const elementType = 'checkbox';
    const label = 'LabelTest';
    const utils = render(
      <Input
        elementType={elementType}
        elementConfig={elementConfig}
        label={label}
      />
    );

    const labelElement = utils.getByLabelText(label) as HTMLInputElement;

    expect(labelElement.checked).toBe(false);

    fireEvent.click(labelElement);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(labelElement.checked).toBe(true);
  });

  it('should set checkbox as checked', () => {
    const onChange = jest.fn();
    const elementConfig = {
      checked: true,
      onChange,
    };
    const elementType = 'checkbox';
    const label = 'LabelTest';
    const utils = render(
      <Input
        elementType={elementType}
        elementConfig={elementConfig}
        label={label}
      />
    );

    const labelElement = utils.getByLabelText(label) as HTMLInputElement;

    expect(labelElement.checked).toBe(true);
  });
});
