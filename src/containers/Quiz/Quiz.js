import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

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

  onStart = () => {
    this.props.history.push('/quiz/game');
  }

  render() {
    return (
      <Section>
        <h1 className="title is-capitalized">
          Quiz
        </h1>

        <Switch>
          <Route path="/quiz/game" component={QuizGame} />
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
  breedNames: state.breedNames
});

const mapDispatchToProps = dispatch => ({
  getBreeds: () => dispatch(breedActions.getBreeds())
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
