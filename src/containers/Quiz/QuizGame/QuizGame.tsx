import React, { FunctionComponent, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';

import './QuizGame.css';
import AnswerButtons from '../../../components/Quiz/AnswerButtons/AnswerButtons';
import QuizImage from '../../../components/Quiz/QuizImage/QuizImage';
import QuizProgress from '../../../components/Quiz/QuizProgress/QuizProgress';
import { answer, nextQuestion, restart } from '../../../store/quiz/actions';
import { AppState } from '../../../store';

const QuizGame: FunctionComponent = () => {
  const quiz = useSelector((state: AppState) => state.quiz);

  const dispatch = useDispatch();
  const dispatchAnswer = (breed: string) => dispatch(answer(breed));
  const { selectedBreeds } = quiz;
  const dispatchNextQuestion = useCallback(
    () => dispatch(nextQuestion(selectedBreeds)),
    [dispatch, selectedBreeds]
  );

  const breedsLoaded = quiz.selectedBreeds.length > 0;

  useEffect(() => {
    if (breedsLoaded) {
      dispatchNextQuestion();
    }
  }, [dispatchNextQuestion, breedsLoaded]);

  const restartQuiz = useCallback(() => {
    dispatch(restart());
    dispatchNextQuestion();
  }, [dispatch, dispatchNextQuestion]);

  if (!quiz.questionCount || quiz.selectedBreeds.length < 2) {
    return <Redirect to="/quiz" />;
  }

  const buttonClick = (breed: string) => {
    if (quiz.numberOfCorrect + quiz.numberOfWrong === +quiz.questionCount) {
      return;
    }

    if (quiz.chosenAnswer) {
      dispatchNextQuestion();
    } else {
      dispatchAnswer(breed);
    }
  };

  if (!quiz.questionCount || quiz.selectedBreeds.length < 2) {
    return <p className="notification is-primary">Redirecting</p>;
  }

  return (
    <React.Fragment>
      <div className="columns">
        <div className="box column is-half is-offset-one-quarter">
          <QuizImage
            chosen={quiz.chosenAnswer}
            correct={quiz.numberOfCorrect}
            gameEnd={
              quiz.numberOfCorrect + quiz.numberOfWrong === +quiz.questionCount
            }
            image={quiz.image}
            nextQuestion={dispatchNextQuestion}
            restart={restartQuiz}
            wrong={quiz.numberOfWrong}
          />

          <div
            className={
              quiz.choices.length === 3 ? 'answers answers-vertical' : 'answers'
            }
          >
            <AnswerButtons
              choices={quiz.choices}
              chosenAnswer={quiz.chosenAnswer}
              click={buttonClick}
              correctAnswer={quiz.correctAnswer}
            />
          </div>
        </div>
      </div>

      <QuizProgress
        correct={quiz.numberOfCorrect}
        questionCount={quiz.questionCount}
        wrong={quiz.numberOfWrong}
        wasCorrect={quiz.wasCorrect}
      />
    </React.Fragment>
  );
};

export default QuizGame;
