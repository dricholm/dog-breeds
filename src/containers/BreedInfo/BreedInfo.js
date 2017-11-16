import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as breedActions from '../../store/actions/breed';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ErrorMessage from '../../components/Ui/ErrorMessage/ErrorMessage'
import Loading from '../../components/Ui/Loading/Loading'
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
      content = <Loading />;
    } else if (this.props.error) {
      content = <ErrorMessage message={this.props.error} />;
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
      content = <ErrorMessage message="Breed not found" />;
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
