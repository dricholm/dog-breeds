import React, {
  FunctionComponent,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './BreedList.css';
import ErrorMessage from '../../components/Ui/ErrorMessage/ErrorMessage';
import Input from '../../components/Form/Input/Input';
import Loading from '../../components/Ui/Loading/Loading';
import Section from '../../components/Ui/Section/Section';
import BreedListLinks from '../../components/BreedListLinks/BreedListLinks';
import { getBreeds } from '../../store/breed/actions';
import { AppState } from '../../store';

const BreedList: FunctionComponent = () => {
  const { breedNames, error, loading } = useSelector(
    (state: AppState) => state.breeds
  );
  const dispatch = useDispatch();
  const dispatchGetBreeds = useCallback(() => dispatch(getBreeds()), [
    dispatch,
  ]);

  const [filter, setFilter] = useState('');

  const breedsLoaded = breedNames.length > 0;

  useEffect(() => {
    if (breedsLoaded) {
      return;
    }
    dispatchGetBreeds();
  }, [breedsLoaded, dispatchGetBreeds]);

  const onFilter: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter(event.target.value);
  };

  if (breedNames) {
    const filtered = breedNames.filter(breed =>
      breed.toLowerCase().includes(filter.toLowerCase())
    );

    if (loading) {
      return (
        <Section>
          <Loading />
        </Section>
      );
    } else if (error) {
      return (
        <Section>
          <ErrorMessage message={error} />
        </Section>
      );
    } else {
      return (
        <Section>
          <React.Fragment>
            <div className="field">
              <div className="control">
                <Input
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

export default BreedList;
