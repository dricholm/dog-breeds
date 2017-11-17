import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as breedActions from '../../store/actions/breed';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ErrorMessage from '../../components/Ui/ErrorMessage/ErrorMessage'
import Loading from '../../components/Ui/Loading/Loading'
import Section from '../../components/Ui/Section/Section';
import SubBreeds from '../../components/BreedInfo/SubBreeds/SubBreeds';

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
      let top;
      if (this.props.match.params.sub) {
        top = (
          <h2 className="subtitle is-capitalized">
            Breed: <Link to={`/breed/${this.props.match.params.breed}`}>{this.props.match.params.breed}</Link>
          </h2>
        );
      } else if (this.props.breeds[this.props.match.params.breed].length > 0) {
        top = <SubBreeds main={this.props.match.params.breed} subs={this.props.breeds[this.props.match.params.breed]} />
      }

      const title = this.props.match.params.sub
        ? this.props.match.params.sub.replace(/-/g, ' ') + ' ' + this.props.match.params.breed
        : this.props.match.params.breed;

      content = (
        <Auxiliary>
          <h1 className="title is-capitalized">
            {title}
          </h1>

          {top}

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
  breeds: state.breeds.breeds,
  breedsLoaded: state.breeds.breedNames.length > 0,
  error: state.breeds.error,
  loading: state.breeds.loading
});

const mapDispatchToProps = dispatch => ({
  getBreeds: () => dispatch(breedActions.getBreeds())
});

export default connect(mapStateToProps, mapDispatchToProps)(BreedInfo);
