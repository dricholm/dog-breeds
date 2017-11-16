import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as quizActions from '../../../store/actions/quiz';
import './QuizGame.css';
import AnswerButtons from '../../../components/Quiz/AnswerButtons/AnswerButtons';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import QuizImage from '../../../components/Quiz/QuizImage/QuizImage';
import QuizProgress from '../../../components/Quiz/QuizProgress/QuizProgress';

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

    return (
      <Auxiliary>
        <div className="columns">
          <div className="box column is-half is-offset-one-quarter">
            <QuizImage
              chosen={this.props.quiz.chosenAnswer}
              correct={this.props.quiz.correct}
              gameEnd={this.props.quiz.correct + this.props.quiz.wrong === +this.props.quiz.questionCount}
              image={this.props.quiz.image}
              nextQuestion={() => this.props.nextQuestion(this.props.quiz.selectedBreeds)}
              restart={this.restart}
              wrong={this.props.quiz.wrong} />

            <div className={this.props.quiz.choices.length === 3 ? 'answers answers-vertical' : 'answers'}>
              <AnswerButtons
                choices={this.props.quiz.choices}
                chosenAnswer={this.props.quiz.chosenAnswer}
                click={this.buttonClick}
                correctAnswer={this.props.quiz.correctAnswer} />
            </div>
          </div>
        </div>

        <QuizProgress
          correct={this.props.quiz.correct}
          questionCount={this.props.quiz.questionCount}
          wrong={this.props.quiz.wrong} />
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
