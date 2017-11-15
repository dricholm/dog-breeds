import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as breedActions from '../../store/actions/breed';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Section from '../../components/Ui/Section/Section';

class BreedInfo extends Component {

  componentDidMount() {
    if (!this.props.breedsLoaded) {
      this.props.getBreeds();
    }
  }

  render() {
    let content;

    if (this.props.loading) {
      content = <div className="notification is-info is-size-5">Loading...</div>;
    } else if (this.props.error) {
      content = <div className="notification is-danger is-size-5">{this.props.error}</div>;
    } else if (this.props.breedFound) {
      const subtitle = (
        <h2 className="subtitle is-capitalized">
          {this.props.match.params.breed}
        </h2>
      );
      const title = this.props.match.params.sub
        ? this.props.match.params.sub.replace(/-/g, ' ') + ' ' + this.props.match.params.breed
        : this.props.match.params.breed;

      content = (
        <Auxiliary>
          <h1 className="title is-capitalized">
            {title}
          </h1>
          {this.props.match.params.sub ? subtitle : null}
        </Auxiliary>
      );
    } else {
      content = <h1 className="title">Breed not found</h1>;
    }

    return (
      <Section>
        {content}
      </Section>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  breedFound: state.breeds.breeds[ownProps.match.params.breed] &&
  (!ownProps.match.params.sub ||
    state.breeds.breeds[ownProps.match.params.breed].indexOf(ownProps.match.params.sub.replace(/-/g, ' ')) > -1)
    ? true
    : false,
  breedsLoaded: state.breeds.breedNames.length > 0,
  error: state.breeds.error,
  loading: state.breeds.loading
});

const mapDispatchToProps = dispatch => ({
  getBreeds: () => dispatch(breedActions.getBreeds())
});

export default connect(mapStateToProps, mapDispatchToProps)(BreedInfo);
