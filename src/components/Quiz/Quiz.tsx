import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import Section from '../../components/Ui/Section/Section';
import QuizForm from '../../containers/Quiz/QuizForm/QuizForm';
import QuizGame from '../../containers/Quiz/QuizGame/QuizGame';

const Quiz: FunctionComponent<any> = (props: any) => {
  return (
    <Section>
      <Switch>
        <Route path="/quiz/game" render={() => <QuizGame {...props} />} />
        <Route path="/quiz" exact render={() => <QuizForm {...props} />} />
      </Switch>
    </Section>
  );
};

export default Quiz;
