import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Nav from './components/Ui/Nav/Nav';
import BreedList from './containers/BreedList/BreedList';
import BreedInfo from './containers/BreedInfo/BreedInfo';
import Quiz from './containers/Quiz/Quiz';
import Section from './components/Ui/Section/Section';
import Footer from './components/Ui/Footer/Footer';

class App extends Component {
  render() {
    return (
      <div className="main">
        <Nav />
        <Switch>
          <Route path="/quiz" component={Quiz} />
          <Route path="/breed/:breed/:sub?" component={BreedInfo} />
          <Route path="/" exact component={BreedList} />
          <Route render={() => (<Section><h1 className="title">Page not found</h1></Section>)} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
