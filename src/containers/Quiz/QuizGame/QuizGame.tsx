import React, { Component } from 'react';
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

export interface QuizGameProps {
  answer: (breed: string) => void;
  history: any;
  nextQuestion: (selectedBreeds: Array<string>) => void;
  quiz: QuizState;
  restart: () => void;
}

class QuizGame extends Component<QuizGameProps> {
  UNSAFE_componentWillMount() {
    if (
      !this.props.quiz.questionCount ||
      this.props.quiz.selectedBreeds.length < 2
    ) {
      this.props.history.push('/quiz');
    } else {
      this.props.nextQuestion(this.props.quiz.selectedBreeds);
    }
  }

  buttonClick = (breed: string) => {
    if (
      this.props.quiz.correct + this.props.quiz.wrong ===
      +this.props.quiz.questionCount
    ) {
      return;
    }

    if (this.props.quiz.chosenAnswer) {
      this.props.nextQuestion(this.props.quiz.selectedBreeds);
    } else {
      this.props.answer(breed);
    }
  };

  restart = () => {
    this.props.restart();
    this.props.nextQuestion(this.props.quiz.selectedBreeds);
  };

  render() {
    if (
      !this.props.quiz.questionCount ||
      this.props.quiz.selectedBreeds.length < 2
    ) {
      return <p>Redirecting</p>;
    }

    return (
      <React.Fragment>
        <div className="columns">
          <div className="box column is-half is-offset-one-quarter">
            <QuizImage
              chosen={this.props.quiz.chosenAnswer}
              correct={this.props.quiz.correct}
              gameEnd={
                this.props.quiz.correct + this.props.quiz.wrong ===
                +this.props.quiz.questionCount
              }
              image={this.props.quiz.image}
              nextQuestion={() =>
                this.props.nextQuestion(this.props.quiz.selectedBreeds)
              }
              restart={this.restart}
              wrong={this.props.quiz.wrong}
            />

            <div
              className={
                this.props.quiz.choices.length === 3
                  ? 'answers answers-vertical'
                  : 'answers'
              }
            >
              <AnswerButtons
                choices={this.props.quiz.choices}
                chosenAnswer={this.props.quiz.chosenAnswer}
                click={this.buttonClick}
                correctAnswer={this.props.quiz.correctAnswer}
              />
            </div>
          </div>
        </div>

        <QuizProgress
          correct={this.props.quiz.correct}
          questionCount={this.props.quiz.questionCount}
          wrong={this.props.quiz.wrong}
          wasCorrect={this.props.quiz.wasCorrect}
        />
      </React.Fragment>
    );
  }
}

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
