import React, { Component } from 'react';

import './App.css';
import Nav from './components/Ui/Nav/Nav';
import BreedList from './containers/BreedList/BreedList';
import Footer from './components/Ui/Footer/Footer';

class App extends Component {
  render() {
    return (
      <div className="main">
        <Nav />
        <BreedList />
        <Footer />
      </div>
    );
  }
}

export default App;
