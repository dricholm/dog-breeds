import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as breedActions from '../../store/actions/breed';
import Section from '../../components/Ui/Section/Section';
import QuizForm from './QuizForm/QuizForm';
import QuizGame from './QuizGame/QuizGame';

class Quiz extends Component {

  componentDidMount() {
    if (this.props.breedNames.length === 0) {
      this.props.getBreeds();
    }
  }

  onStart = (questions, breeds) => {
    this.props.setOptions(questions, breeds);
    this.props.history.push('/quiz/game');
  }

  render() {
    return (
      <Section>
        <h1 className="title is-capitalized">
          Quiz
        </h1>

        <Switch>
          <Route
            path="/quiz/game"
            render={() => this.props.gameOptions.questions && this.props.gameOptions.selectedBreeds.length > 1
              ? <QuizGame
                  gameOptions={this.props.gameOptions} />
              : <Redirect to="/quiz" />} />
          <Route
            path="/quiz"
            exact
            render={() => (
              <QuizForm
                breedNames={this.props.breedNames}
                onStart={this.onStart} />
            )} />
        </Switch>
      </Section>
    );
  }
}

const mapStateToProps = state => ({
  breedNames: state.breedNames,
  gameOptions: state.gameOptions
});

const mapDispatchToProps = dispatch => ({
  getBreeds: () => dispatch(breedActions.getBreeds()),
  setOptions: (questions, selectedBreeds) => dispatch(breedActions.setOptions(questions, selectedBreeds))
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
