import React, { Component } from 'react';

import './BreedList.css';
import Section from '../../components/Ui/Section/Section';

class BreedList extends Component {

  state = {
    breeds: {
      'akita': [],
      'corgi': [
        'cardigan',
        'pembroke welsh'
      ],
      'shiba': [],
      'vizsla': [
        'short haired',
        'wire haired'
      ]
    },
    filter: ''
  }

  onFilter = (event) => {
    this.setState({filter: event.target.value});
  }

  render() {
    const mainBreedNames = [
      ...Object.keys(this.state.breeds)
    ];
    const breedNames = [];
    mainBreedNames.forEach((breed, idx) => {
      if (this.state.breeds[breed].length === 0) {
        breedNames.push(breed);
      } else {
        breedNames.push(...this.state.breeds[breed].map((sub) => sub + ' ' + breed));
      }
    });

    const breedList = breedNames
      .filter((breed) => breed.toLowerCase().includes(this.state.filter.toLowerCase()))
      .map((val) => <li key={val}>{val}</li>);

    return (
      <Section>
        <h1 className="title">
          List of dog breeds
        </h1>

        <div className="field">
          <div className="control">
            <input
              className="input is-info is-medium"
              onChange={this.onFilter}
              placeholder="Filter breeds"
              type="text" />
          </div>
        </div>

        <ul className="is-size-5 is-capitalized">
          {breedList}
        </ul>
      </Section>
    );
  }
}

export default BreedList;