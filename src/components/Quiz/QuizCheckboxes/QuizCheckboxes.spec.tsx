import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import QuizCheckboxes from './QuizCheckboxes';

describe('<QuizCheckboxes />', () => {
  it('should display checkboxes', () => {
    const checkboxes = { a: true, aa: false, b: false, f: true };
    const changeValue = jest.fn();
    const utils = render(
      <QuizCheckboxes checkboxes={checkboxes} changeValue={changeValue} />
    );

    Object.keys(checkboxes).forEach(label => {
      utils.getByLabelText(label);
    });

    const initials = utils.container.querySelectorAll('.label.is-capitalized');
    expect(initials.length).toBe(3);
    expect(initials[0].textContent).toBe('a');
    expect(initials[1].textContent).toBe('b');
    expect(initials[2].textContent).toBe('f');
  });

  it('should change checkbox', () => {
    const checkboxes = { a: true, b: false };
    const changeValue = jest.fn();
    const utils = render(
      <QuizCheckboxes checkboxes={checkboxes} changeValue={changeValue} />
    );

    expect(changeValue).toHaveBeenCalledTimes(0);
    const bCheckbox = utils.getByLabelText('b');
    fireEvent.click(bCheckbox);

    expect(changeValue).toHaveBeenCalledTimes(1);
    expect(changeValue).toHaveBeenCalledWith('b', true);
  });
});
