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
    if (this.props.breedNames.length === 0) {
      this.props.getBreeds();
    }
  }

  onFilter = (event) => {
    this.setState({filter: event.target.value});
  }

  render() {
    let content;

    if (this.props.breedNames) {
      const filtered = this.props.breedNames
        .filter(breed => breed.toLowerCase().includes(this.state.filter.toLowerCase()));

      if (this.props.loading) {
        content = <div className="notification is-info is-size-5">Loading...</div>;
      } else if (this.props.error) {
        content = <div className="notification is-danger is-size-5">{this.props.error}</div>;
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
      }
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
  breedNames: state.breeds.breedNames,
  error: state.breeds.error,
  loading: state.breeds.loading
});

const mapDispatchToProps = dispatch => ({
  getBreeds: () => dispatch(breedActions.getBreeds())
});

export default connect(mapStateToProps, mapDispatchToProps)(BreedList);
