import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './BreedList.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Section from '../../components/Ui/Section/Section';
import * as breedActions from '../../store/actions/breed';

class BreedList extends Component {

  state = {
    filter: ''
  }

  componentDidMount() {
    this.props.onGetBreeds();
  }

  onFilter = (event) => {
    this.setState({filter: event.target.value});
  }

  render() {
    let content;

    if (this.props.breedNames) {
      const filtered = this.props.breedNames
        .filter(breed => breed.toLowerCase().includes(this.state.filter.toLowerCase()));

      let result;
      if (filtered.length === 0) {
        result = <div className="notification is-size-5">No breeds found</div>;
      } else {
        const breedList = filtered.map(val => {
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
        result = (
          <ul className="is-size-5 is-capitalized">
            {breedList}
          </ul>
        );
      }

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

          {result}
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
  breedNames: state.breedNames
});

const mapDispatchToProps = dispatch => ({
  onGetBreeds: () => dispatch(breedActions.getBreeds())
});

export default connect(mapStateToProps, mapDispatchToProps)(BreedList);
