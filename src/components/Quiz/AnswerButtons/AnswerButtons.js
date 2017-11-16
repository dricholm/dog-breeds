import React from 'react';

const answerButtons = props => {
  return props.choices.map(breed => {
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
        onClick={() => props.click(breed)}>
        {breed.replace(/-/g, ' ')}
      </button>
    )
  });
};

export default answerButtons;
