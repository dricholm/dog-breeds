import React from 'react';

const quizProgress = props => {
  const progress = (props.correct + props.wrong) / props.questionCount * 100;

  return (
    <div className="columns is-multiline">
      <div className="column is-half is-offset-one-quarter">
        <progress className="progress is-primary" value={progress.toString()} max="100">{progress}%</progress>

        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Correct</p>
              <p className="title has-text-primary">{props.correct}</p>
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
              <p className="title has-text-danger">{props.wrong}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default quizProgress;
