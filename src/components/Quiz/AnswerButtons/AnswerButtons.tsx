import React, { Fragment } from 'react';

export interface AnswerButtonsProps {
  choices: Array<string>;
  chosenAnswer: string;
  click: (breed: string) => void;
  correctAnswer: string;
}

const answerButtons = (props: AnswerButtonsProps) => {
  return (
    <Fragment>
      {props.choices.map((breed: string) => {
        const classNames = ['answer', 'button', 'is-medium', 'is-capitalized'];
        if (props.chosenAnswer) {
          if (breed === props.correctAnswer) {
            classNames.push('is-success');
          } else if (breed === props.chosenAnswer) {
            classNames.push('is-danger');
          } else {
            classNames.push('is-info', 'is-outlined');
          }
        } else {
          classNames.push('is-info');
        }

        return (
          <button
            key={breed}
            className={classNames.join(' ')}
            onClick={() => props.click(breed)}
          >
            {breed.replace(/-/g, ' ')}
          </button>
        );
      })}
    </Fragment>
  );
};

export default answerButtons;
