import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as breedActions from '../../../store/actions/breed';
import './QuizGame.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

class QuizGame extends Component {

  componentWillMount() {
    if (!this.props.gameOptions.questions || this.props.gameOptions.selectedBreeds.length < 2) {
      this.props.history.push('/quiz');
    }
    this.props.nextQuestion();
  }

  buttonClick = (breed) => {
    if (this.props.game.answered) {
      this.props.nextQuestion();
    } else {
      this.props.answer(breed);
    }
  }

  render() {
    if (!this.props.gameOptions.questions || this.props.gameOptions.selectedBreeds.length < 2) {
      return <p>Redirecting</p>;
    }

    const answerButtons = this.props.game.answers.map((breed) => {
      const classNames = ['answer', 'button', 'is-medium', 'is-capitalized'];
      if (this.props.game.answered) {
        if (breed === this.props.game.correctAnswer) {
          classNames.push('is-success');
        } else if (breed === this.props.game.answered) {
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
          {breed}
        </button>
      );
    });

    const progress = (this.props.game.correct + this.props.game.wrong) / this.props.gameOptions.questions * 100;
    return (
      <Auxiliary>
        <div className="columns">
          <div className="box column is-half is-offset-one-quarter">
            <figure className="image is-1by1 quiz-image-box next-question">
              <img src={this.props.game.image} alt="Dog" className="quiz-image" />
              {this.props.game.answered
                ? (
                  <a
                    aria-label="next"
                    className="quiz-next has-text-white"
                    onClick={this.props.nextQuestion}>
                    <i className="fa fa-chevron-right fa-fw" aria-hidden="true"></i>
                  </a>
                )
                : null }
            </figure>

            <div className="answers">
              {answerButtons}
              {/* <button className="answer button is-info is-block is-medium">Choice button</button>
              <button className="answer button is-info is-outlined is-block is-medium">Inactive</button>
              <button className="answer button is-success is-block is-medium">Correct</button>
              <button className="answer button is-danger is-block is-medium">Incorrect</button> */}
            </div>
          </div>
        </div>

        <div className="columns is-multiline">
          <div className="column is-half is-offset-one-quarter">
            <progress className="progress is-primary" value={progress.toString()} max="100">{progress}%</progress>

            <div className="level">
              <div className="level-item has-text-success is-size-4">
                Correct {this.props.game.correct}
            </div>
              <div className="level-item has-text-weight-bold is-size-3">
                {this.props.game.correct + this.props.game.wrong}/{this.props.gameOptions.questions}
            </div>
              <div className="level-item has-text-danger is-size-4">
                Wrong {this.props.game.wrong}
            </div>
            </div>
          </div>
        </div>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
  gameOptions: state.gameOptions
});

const mapDispatchToProps = dispatch => ({
  getBreeds: () => dispatch(breedActions.getBreeds()),
  setOptions: (questions, selectedBreeds) => dispatch(breedActions.setOptions(questions, selectedBreeds)),
  nextQuestion: () => dispatch(breedActions.nextQuestion()),
  answer: (breed) => dispatch(breedActions.answer(breed))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizGame);
