import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import AnswerButtons from './AnswerButtons';

describe('<AnswerButtons />', () => {
  it('should display choices', () => {
    const choices = ['First', 'Second'];
    const click = jest.fn();
    const utils = render(<AnswerButtons choices={choices} click={click} />);

    choices.forEach(choice => {
      const button = utils.getByText(choice);
      expect(button).toHaveClass('is-info');
      expect(button).not.toHaveClass('is-outlined');
    });
  });

  it('should call props.click on click', () => {
    const choices = ['First', 'Second'];
    const click = jest.fn();
    const utils = render(<AnswerButtons choices={choices} click={click} />);

    const choice = utils.getByText(choices[1]);
    fireEvent.click(choice);

    expect(click).toHaveBeenCalledWith(choices[1]);
  });

  it('should display correct choice', () => {
    const choices = ['First', 'Second'];
    const chosenAnswer = choices[0];
    const click = jest.fn();
    const correctAnswer = choices[0];
    const utils = render(
      <AnswerButtons
        choices={choices}
        click={click}
        chosenAnswer={chosenAnswer}
        correctAnswer={correctAnswer}
      />
    );

    const buttons = utils.container.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toBe(choices[0]);
    expect(buttons[1].textContent).toBe(choices[1]);
    expect(buttons[0]).toHaveClass('is-success');
    expect(buttons[1]).toHaveClass('is-info');
    expect(buttons[1]).toHaveClass('is-outlined');
  });

  it('should display wrong choice', () => {
    const choices = ['First', 'Second'];
    const chosenAnswer = choices[0];
    const click = jest.fn();
    const correctAnswer = choices[1];
    const utils = render(
      <AnswerButtons
        choices={choices}
        click={click}
        chosenAnswer={chosenAnswer}
        correctAnswer={correctAnswer}
      />
    );

    const buttons = utils.container.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toBe(choices[0]);
    expect(buttons[1].textContent).toBe(choices[1]);
    expect(buttons[0]).toHaveClass('is-danger');
    expect(buttons[1]).toHaveClass('is-success');
  });
});
