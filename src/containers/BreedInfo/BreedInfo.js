import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Section from '../../components/Ui/Section/Section';

class BreedInfo extends Component {
  render() {
    let content;

    if (this.props.breedFound && this.props.subFound) {
      const sub = this.props.match.params.sub ? this.props.match.params.sub.replace(/-/g, ' ') : null;
      const title = sub
        ? sub + ' ' + this.props.match.params.breed
        : this.props.match.params.breed;

      content = (
        <Auxiliary>
          <h1 className="title is-capitalized">
            {title}
          </h1>
          <h2 className="subtitle is-capitalized">
            {sub ? this.props.match.params.breed : null}
          </h2>
        </Auxiliary>
      );
    } else {
      content = <h1 className="title has-text-danger">Breed not found</h1>;
    }

    return (
      <Section>
        {content}
      </Section>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  breedFound: state.breeds[ownProps.match.params.breed] ? true : false,
  subFound: state.breeds[ownProps.match.params.breed] &&
    (!ownProps.match.params.sub ||
      state.breeds[ownProps.match.params.breed].indexOf(ownProps.match.params.sub.replace(/-/g, ' ')) > -1)
    ? true
    : false
});

export default connect(mapStateToProps)(BreedInfo);
