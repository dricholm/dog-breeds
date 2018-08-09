import React from 'react';
import PropTypes from 'prop-types';

import './QuizProgress.css';

const quizProgress = props => {
  const progress = ((props.correct + props.wrong) / props.questionCount) * 100;

  const correctClasses = ['title', 'has-text-success'];
  const wrongClasses = ['title', 'has-text-danger'];
  if (props.wasCorrect) {
    correctClasses.push('answer-pop');
  } else if (props.wasCorrect === false) {
    wrongClasses.push('answer-pop');
  }

  return (
    <div className="columns is-multiline">
      <div className="column is-half is-offset-one-quarter">
        <progress
          className="progress is-primary"
          value={progress.toString()}
          max="100"
        >
          {progress}%
        </progress>

        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Correct</p>
              <p className={correctClasses.join(' ')}>{props.correct}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Progress</p>
              <p className="title">
                {props.correct + props.wrong}/{props.questionCount}
              </p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Wrong</p>
              <p className={wrongClasses.join(' ')}>{props.wrong}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

quizProgress.propTypes = {
  correct: PropTypes.number,
  questionCount: PropTypes.number,
  wasCorrect: PropTypes.bool,
  wrong: PropTypes.number,
};

export default quizProgress;
