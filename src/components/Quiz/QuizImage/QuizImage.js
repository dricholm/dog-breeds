import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Loading from '../../Ui/Loading/Loading';

const quizImage = props => {
  let overlay;
  if (props.chosen) {
    let button;
    if (props.gameEnd) {
      const ratio = Math.round(props.correct / (props.correct + props.wrong) * 100);
      button = (
        <div className="has-text-centered">
          <div className="message is-primary">
            <div className="message-body is-size-3">
              <p className="has-text-weight-bold is-size-1">
                {ratio}%
              </p>
              <p className="has-text-success">Correct: {props.correct}</p>
              <p className="has-text-danger">Wrong: {props.wrong}</p>
            </div>
          </div>
          <a aria-label="restart" className="quiz-button" onClick={props.restart}>
            <FontAwesomeIcon icon="sync" fixedWidth />
          </a>
        </div>
      );
    } else {
      button = (
        <a
          aria-label="next"
          className="quiz-button quiz-next"
          onClick={props.nextQuestion}>
          <FontAwesomeIcon icon="chevron-right" fixedWidth />
        </a>
      );
    }
    overlay = (
      <div className="quiz-overlay">
        {button}
      </div>
    );
  }

  let content;
  if (props.image) {
    content = (
      <figure className="image is-1by1 quiz-image-box next-question">
        <div className="quiz-image-fill" style={{ backgroundImage: `url(${props.image})` }}></div>
        <div className="quiz-image" style={{ backgroundImage: `url(${props.image})` }}></div>

        {overlay}
      </figure>
    );
  } else {
    content = <Loading />;
  }

  return content;
};

export default quizImage;
