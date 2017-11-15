import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as quizActions from '../../../store/actions/quiz';
import './QuizGame.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

class QuizGame extends Component {

  componentWillMount() {
    if (!this.props.quiz.questionCount || this.props.quiz.selectedBreeds.length < 2) {
      this.props.history.push('/quiz');
    } else {
      this.props.nextQuestion(this.props.quiz.selectedBreeds);
    }
  }

  buttonClick = breed => {
    if (this.props.quiz.correct + this.props.quiz.wrong === +this.props.quiz.questionCount) return;
    if (this.props.quiz.chosenAnswer) {
      this.props.nextQuestion(this.props.quiz.selectedBreeds);
    } else {
      this.props.answer(breed);
    }
  }

  restart = () => {
    this.props.restart();
    this.props.nextQuestion(this.props.quiz.selectedBreeds);
  }

  render() {
    if (!this.props.quiz.questionCount || this.props.quiz.selectedBreeds.length < 2) {
      return <p>Redirecting</p>;
    }

    const answerButtons = this.props.quiz.choices.map((breed) => {
      const classNames = ['answer', 'button', 'is-medium', 'is-capitalized'];
      if (this.props.quiz.chosenAnswer) {
        if (breed === this.props.quiz.correctAnswer) {
          classNames.push('is-success');
        } else if (breed === this.props.quiz.chosenAnswer) {
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
          onClick={(event) => this.buttonClick(breed)}>
          {breed.replace(/-/g, ' ')}
        </button>
      );
    });

    let overlay = null;
    if (this.props.quiz.chosenAnswer) {
      let button;
      if (this.props.quiz.correct + this.props.quiz.wrong === +this.props.quiz.questionCount) {
        button = (
          <div className="has-text-centered">
            <div className="notification is-link is-size-3">
              <p className="has-text-weight-bold is-size-1">
                {Math.round(this.props.quiz.correct / (this.props.quiz.correct + this.props.quiz.wrong) * 100)}%
              </p>
              <p>Correct: {this.props.quiz.correct}</p>
              <p>Wrong: {this.props.quiz.wrong}</p>
            </div>
            <a aria-label="next" className="quiz-button" onClick={this.restart}>
              <i className="fa fa-refresh fa-fw" aria-hidden="true"></i>
            </a>
          </div>
        );
      } else {
        button = (
          <a
            aria-label="replay"
            className="quiz-button quiz-next"
            onClick={() => this.props.nextQuestion(this.props.quiz.selectedBreeds)}>
            <i className="fa fa-chevron-right fa-fw" aria-hidden="true"></i>
          </a>
        );
      }
      overlay = (
        <div className="quiz-overlay">
          {button}
        </div>
      );
    }

    const progress = (this.props.quiz.correct + this.props.quiz.wrong) / this.props.quiz.questionCount * 100;
    return (
      <Auxiliary>
        <div className="columns">
          <div className="box column is-half is-offset-one-quarter">
            <figure className="image is-1by1 quiz-image-box next-question" style={{backgroundImage: `url(${this.props.quiz.image})`}}>
              <div className="quiz-image-fill" style={{ backgroundImage: `url(${this.props.quiz.image})` }}></div>
              <div className="quiz-image" style={{ backgroundImage: `url(${this.props.quiz.image})` }}></div>
              {overlay}
            </figure>

            <div className="answers">
              {answerButtons}
            </div>
          </div>
        </div>

        <div className="columns is-multiline">
          <div className="column is-half is-offset-one-quarter">
            <progress className="progress is-primary" value={progress.toString()} max="100">{progress}%</progress>

            <div className="level">
              <div className="level-item has-text-success is-size-4">
                Correct {this.props.quiz.correct}
            </div>
              <div className="level-item has-text-weight-bold is-size-3">
                {this.props.quiz.correct + this.props.quiz.wrong}/{this.props.quiz.questionCount}
            </div>
              <div className="level-item has-text-danger is-size-4">
                Wrong {this.props.quiz.wrong}
            </div>
            </div>
          </div>
        </div>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => ({
  quiz: state.quiz
});

const mapDispatchToProps = dispatch => ({
  setOptions: (questions, selectedBreeds) => dispatch(quizActions.setOptions(questions, selectedBreeds)),
  nextQuestion: (selectedBreeds) => dispatch(quizActions.nextQuestion(selectedBreeds)),
  answer: (breed) => dispatch(quizActions.answer(breed)),
  restart: () => dispatch(quizActions.restart())
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizGame);
