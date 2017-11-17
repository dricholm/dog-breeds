import React, { Component } from 'react';
import { connect } from 'react-redux';

import './BreedList.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ErrorMessage from '../../components/Ui/ErrorMessage/ErrorMessage'
import Input from '../../components/Form/Input/Input'
import Loading from '../../components/Ui/Loading/Loading'
import Section from '../../components/Ui/Section/Section';
import BreedListLinks from '../../components/BreedListLinks/BreedListLinks';
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
        content = <Loading />;
      } else if (this.props.error) {
        content = <ErrorMessage message={this.props.error} />;
      } else {
        content = (
          <Auxiliary>
            <div className="field">
              <div className="control">
                <Input
                  changed={this.onFilter}
                  elementConfig={{
                    autoFocus: true,
                    className: 'input is-info is-medium',
                    onChange: this.onFilter,
                    placeholder: 'Filter breeds',
                    type: 'text'
                  }}
                  elementType="input" />
              </div>
            </div>

            <BreedListLinks breeds={filtered} />
          </Auxiliary>
        );
      }
    } else {
      content = <ErrorMessage message="No breeds found" />;
    }

    return (
      <Section>
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
