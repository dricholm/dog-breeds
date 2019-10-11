import React, { FunctionComponent } from 'react';

import './QuizProgress.scss';

export interface QuizProgressProps {
  correct: number;
  questionCount: number;
  wasCorrect: boolean;
  wrong: number;
}

const QuizProgress: FunctionComponent<QuizProgressProps> = (
  props: QuizProgressProps
) => {
  const progress = ((props.correct + props.wrong) / props.questionCount) * 100;

  const correctClasses = ['title', 'has-text-success'];
  const wrongClasses = ['title', 'has-text-danger'];

  switch (props.wasCorrect) {
    case true:
      correctClasses.push('answer-pop');
      break;

    case false:
      wrongClasses.push('answer-pop');
      break;

    default:
      break;
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

export default QuizProgress;
