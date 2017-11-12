import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './BreedList.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Section from '../../components/Ui/Section/Section';

class BreedList extends Component {

  state = {
    filter: ''
  }

  onFilter = (event) => {
    this.setState({filter: event.target.value});
  }

  render() {
    let content;

    if (this.props.breeds) {
      const mainBreedNames = [
        ...Object.keys(this.props.breeds)
      ];
      const breedNames = [];
      mainBreedNames.forEach((breed, idx) => {
        if (this.props.breeds[breed].length === 0) {
          breedNames.push(breed);
        } else {
          breedNames.push(...this.props.breeds[breed].map((sub) => sub + ' ' + breed));
        }
      });

      const breedList = breedNames
        .filter(breed => breed.toLowerCase().includes(this.state.filter.toLowerCase()))
        .map(val => {
          const split = val.split(' ');
          const sub = split.length > 1 ? split.slice(0, split.length-1).join('-') : null;
          const link = sub
            ? '/breed/' + split[split.length - 1] + '/' + sub
            : '/breed/' + split[split.length - 1];
          return (
            <li key={val}>
              <Link to={link}>
                {val}
              </Link>
              </li>
          );
        });

      content = (
        <Auxiliary>
          <div className="field">
            <div className="control">
              <input
                autoFocus
                className="input is-info is-medium"
                onChange={this.onFilter}
                placeholder="Filter breeds"
                type="text" />
            </div>
          </div>

          <ul className="is-size-5 is-capitalized">
            {breedList}
          </ul>
        </Auxiliary>
      );
    } else {
      content = <h1 className="title has-text-danger">Error: No breeds found</h1>;
    }

    return (
      <Section>
        <h1 className="title">
          List of dog breeds
        </h1>

        {content}
      </Section>
    );
  }
}

const mapStateToProps = state => ({
  breeds: state.breeds
});

export default connect(mapStateToProps, null)(BreedList);
