import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';

import './QuizGame.css';
import AnswerButtons from '../../../components/Quiz/AnswerButtons/AnswerButtons';
import QuizImage from '../../../components/Quiz/QuizImage/QuizImage';
import QuizProgress from '../../../components/Quiz/QuizProgress/QuizProgress';
import {
  answer,
  nextQuestion,
  restart,
  setOptions,
} from '../../../store/quiz/actions';
import { AppState } from '../../../store';
import { QuizState } from '../../../store/quiz/types';

interface QuizGameProps {
  answer: (breed: string) => void;
  history: any;
  nextQuestion: (selectedBreeds: Array<string>) => void;
  quiz: QuizState;
  restart: () => void;
}

const QuizGame: FunctionComponent<QuizGameProps> = (props: QuizGameProps) => {
  useEffect(() => {
    if (!props.quiz.questionCount || props.quiz.selectedBreeds.length < 2) {
      props.history.push('/quiz');
    } else {
      props.nextQuestion(props.quiz.selectedBreeds);
    }
  }, []);

  const buttonClick: (breed: string) => void = (breed: string) => {
    if (props.quiz.correct + props.quiz.wrong === +props.quiz.questionCount) {
      return;
    }

    if (props.quiz.chosenAnswer) {
      props.nextQuestion(props.quiz.selectedBreeds);
    } else {
      props.answer(breed);
    }
  };

  const restart: () => void = () => {
    props.restart();
    props.nextQuestion(props.quiz.selectedBreeds);
  };

  if (!props.quiz.questionCount || props.quiz.selectedBreeds.length < 2) {
    return <p className="notification is-primary">Redirecting</p>;
  }

  return (
    <React.Fragment>
      <div className="columns">
        <div className="box column is-half is-offset-one-quarter">
          <QuizImage
            chosen={props.quiz.chosenAnswer}
            correct={props.quiz.correct}
            gameEnd={
              props.quiz.correct + props.quiz.wrong ===
              +props.quiz.questionCount
            }
            image={props.quiz.image}
            nextQuestion={() => props.nextQuestion(props.quiz.selectedBreeds)}
            restart={restart}
            wrong={props.quiz.wrong}
          />

          <div
            className={
              props.quiz.choices.length === 3
                ? 'answers answers-vertical'
                : 'answers'
            }
          >
            <AnswerButtons
              choices={props.quiz.choices}
              chosenAnswer={props.quiz.chosenAnswer}
              click={buttonClick}
              correctAnswer={props.quiz.correctAnswer}
            />
          </div>
        </div>
      </div>

      <QuizProgress
        correct={props.quiz.correct}
        questionCount={props.quiz.questionCount}
        wrong={props.quiz.wrong}
        wasCorrect={props.quiz.wasCorrect}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState) => ({
  quiz: state.quiz,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
  answer: (breed: string) => dispatch(answer(breed)),
  nextQuestion: (selectedBreeds: Array<string>) =>
    dispatch(nextQuestion(selectedBreeds)),
  restart: () => dispatch(restart()),
  setOptions: (questionNumber: number, selectedBreeds: Array<string>) =>
    dispatch(setOptions(questionNumber, selectedBreeds)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizGame);
