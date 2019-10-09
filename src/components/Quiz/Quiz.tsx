import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import Section from '../../components/Ui/Section/Section';
import QuizForm from '../../containers/Quiz/QuizForm/QuizForm';
import QuizGame from '../../containers/Quiz/QuizGame/QuizGame';

const Quiz: FunctionComponent<any> = () => {
  return (
    <Section>
      <Switch>
        <Route path="/quiz/game">
          <QuizGame />
        </Route>
        <Route path="/quiz" exact>
          <QuizForm />
        </Route>
      </Switch>
    </Section>
  );
};

export default Quiz;
