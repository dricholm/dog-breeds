import React, { Component } from 'react';

import './QuizGame.css';
import Section from '../../../components/Ui/Section/Section';

class QuizGame extends Component {
  render() {
    return (
      <Section>

        <div className="columns">
          <div className="box column is-half is-offset-one-quarter">
            <figure className="image is-1by1 quiz-image-box next-question">
              <img src="./dog.jpg" alt="Dog" className="quiz-image" />
              <a href="#todo" aria-label="next" className="quiz-next has-text-white">
                <i className="fa fa-chevron-right fa-fw" aria-hidden="true"></i>
              </a>
            </figure>

            <div className="answers">
              <button className="answer button is-info is-block is-medium">Choice button</button>
              <button className="answer button is-info is-outlined is-block is-medium">Inactive</button>
              <button className="answer button is-success is-block is-medium">Correct</button>
              <button className="answer button is-danger is-block is-medium">Incorrect</button>
            </div>
          </div>
        </div>

        <div className="columns is-multiline">
          <div className="column is-half is-offset-one-quarter">
            <progress className="progress is-primary" value="40" max="100">40%</progress>

            <div className="level">
              <div className="level-item has-text-success is-size-4">
                Correct 6
            </div>
              <div className="level-item has-text-weight-bold is-size-3">
                8/20
            </div>
              <div className="level-item has-text-danger is-size-4">
                Wrong 1
            </div>
            </div>
          </div>
        </div>

      </Section>
    );
  }
}

export default QuizGame;