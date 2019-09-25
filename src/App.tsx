import { Route, Switch } from 'react-router-dom';
import React, { FunctionComponent } from 'react';

import './App.scss';

import About from './components/About/About';
import BreedInfo from './containers/BreedInfo/BreedInfo';
import BreedList from './containers/BreedList/BreedList';
import Footer from './components/Ui/Footer/Footer';
import Nav from './components/Ui/Nav/Nav';
import Quiz from './components/Quiz/Quiz';
import Section from './components/Ui/Section/Section';

const App: FunctionComponent = () => (
  <div className="main">
    <Nav />
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/quiz">
        <Quiz />
      </Route>
      <Route path="/breed/:breed/:sub?">
        <BreedInfo />
      </Route>
      <Route path="" exact>
        <BreedList />
      </Route>
      <Route>
        <Section>
          <h1 className="title">Page not found</h1>
        </Section>
      </Route>
    </Switch>
    <Footer />
  </div>
);

export default App;
