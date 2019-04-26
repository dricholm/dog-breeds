import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './BreedList.css';
import ErrorMessage from '../../components/Ui/ErrorMessage/ErrorMessage';
import Input from '../../components/Form/Input/Input';
import Loading from '../../components/Ui/Loading/Loading';
import Section from '../../components/Ui/Section/Section';
import BreedListLinks from '../../components/BreedListLinks/BreedListLinks';
import { getBreeds } from '../../store/breed/actions';
import { AppState } from '../../store';

export interface BreedListProps {
  breedNames: Array<string>;
  error: string;
  getBreeds: () => void;
  loading: boolean;
}

const BreedList: FunctionComponent<BreedListProps> = (
  props: BreedListProps
) => {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (props.breedNames.length === 0) {
      props.getBreeds();
    }
  });

  const onFilter: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter(event.target.value);
  };

  if (props.breedNames) {
    const filtered = props.breedNames.filter(breed =>
      breed.toLowerCase().includes(filter.toLowerCase())
    );

    if (props.loading) {
      return (
        <Section>
          <Loading />
        </Section>
      );
    } else if (props.error) {
      return (
        <Section>
          <ErrorMessage message={props.error} />
        </Section>
      );
    } else {
      return (
        <Section>
          <React.Fragment>
            <div className="field">
              <div className="control">
                <Input
                  // changed={onFilter}
                  elementConfig={{
                    autoFocus: true,
                    className: 'input is-info is-medium',
                    onChange: onFilter,
                    placeholder: 'Filter breeds',
                    type: 'text',
                  }}
                  elementType="input"
                />
              </div>
            </div>

            <BreedListLinks breeds={filtered} />
          </React.Fragment>
        </Section>
      );
    }
  } else {
    return (
      <Section>
        <ErrorMessage message="No breeds found" />
      </Section>
    );
  }
};

const mapStateToProps = (state: AppState) => ({
  breedNames: state.breeds.breedNames,
  error: state.breeds.error,
  loading: state.breeds.loading,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
  getBreeds: () => dispatch(getBreeds()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreedList);
