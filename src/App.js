import { Route, Switch } from 'react-router-dom';
import React from 'react';

import './App.css';

import About from './components/About/About';
import BreedInfo from './containers/BreedInfo/BreedInfo';
import BreedList from './containers/BreedList/BreedList';
import Footer from './components/Ui/Footer/Footer';
import Nav from './components/Ui/Nav/Nav';
import Quiz from './components/Quiz/Quiz';
import Section from './components/Ui/Section/Section';

const app = () => (
  <div className="main">
    <Nav />
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/breed/:breed/:sub?" component={BreedInfo} />
      <Route path="" exact component={BreedList} />
      <Route
        render={() => (
          <Section>
            <h1 className="title">Page not found</h1>
          </Section>
        )}
      />
    </Switch>
    <Footer />
  </div>
);

export default app;
