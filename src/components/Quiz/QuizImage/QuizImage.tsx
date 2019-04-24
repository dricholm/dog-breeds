import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './QuizImage.css';
import Loading from '../../Ui/Loading/Loading';

export interface QuizImageProps {
  chosen: string;
  correct: number;
  gameEnd: boolean;
  image: string;
  nextQuestion: () => void;
  restart: () => void;
  wrong: number;
}

const QuizImage: FunctionComponent<QuizImageProps> = (
  props: QuizImageProps
) => {
  if (props.image == null) {
    return <Loading />;
  }

  let overlay: JSX.Element;
  if (props.chosen) {
    let button: JSX.Element;
    if (props.gameEnd) {
      const ratio = Math.round(
        (props.correct / (props.correct + props.wrong)) * 100
      );
      button = (
        <div className="has-text-centered">
          <div className="box has-shadow">
            <p className="has-text-weight-bold is-size-1">{ratio}%</p>
            <p className="has-text-success is-size-4">
              Correct: {props.correct}
            </p>
            <p className="has-text-danger is-size-4">Wrong: {props.wrong}</p>
          </div>
          <button
            aria-label="restart"
            className="quiz-button"
            onClick={props.restart}
          >
            <FontAwesomeIcon icon="sync" fixedWidth />
          </button>
        </div>
      );
    } else {
      button = (
        <button
          aria-label="next"
          className="quiz-button quiz-next"
          onClick={props.nextQuestion}
        >
          <FontAwesomeIcon icon="chevron-right" fixedWidth />
        </button>
      );
    }
    overlay = <div className="quiz-overlay">{button}</div>;
  }

  return (
    <figure className="image is-1by1 quiz-image-box next-question">
      <div
        className="quiz-image-fill"
        style={{ backgroundImage: `url(${props.image})` }}
      />
      <div
        className="quiz-image"
        style={{ backgroundImage: `url(${props.image})` }}
      />

      {overlay}
    </figure>
  );
};

export default QuizImage;
