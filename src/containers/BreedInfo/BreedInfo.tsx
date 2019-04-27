import React, { FunctionComponent, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import axios from '../../shared/axiosDogApi';
import BreedGallery from '../../components/BreedInfo/BreedGallery/BreedGallery';
import ErrorMessage from '../../components/Ui/ErrorMessage/ErrorMessage';
import ImageModal from '../../components/Ui/ImageModal/ImageModal';
import Loading from '../../components/Ui/Loading/Loading';
import Section from '../../components/Ui/Section/Section';
import SubBreeds from '../../components/BreedInfo/SubBreeds/SubBreeds';
import { getBreeds } from '../../store/breed/actions';
import { AppState } from '../../store';
import { breedInfoReducer, initialState } from './reducers';

interface BreedInfoProps {
  breedFound: boolean;
  breeds: { [breed: string]: Array<string> };
  breedsLoaded: boolean;
  error: string;
  getBreeds: () => void;
  loading: boolean;
  match: any;
}

const BreedInfo: FunctionComponent<BreedInfoProps> = (
  props: BreedInfoProps
) => {
  const [state, dispatch] = useReducer(breedInfoReducer, initialState);

  const { breedsLoaded, getBreeds } = props;
  const { breed, sub } = props.match.params;

  const shouldLoad: boolean =
    (breedsLoaded && state.currentBreed.main !== breed) ||
    state.currentBreed.sub !== sub ||
    (state.imageUrls.length === 0 && !state.imageError && !state.loadingImages);

  useEffect(() => {
    const shuffle: (array: Array<string>) => Array<string> = (
      array: Array<string>
    ) => {
      const ret = array.slice();
      for (let i = ret.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ret[i], ret[j]] = [ret[j], ret[i]];
      }
      return ret;
    };

    const getImages: () => Promise<void> = async () => {
      dispatch({ type: 'INIT_REQUEST', payload: { breed, sub } });

      const url = sub
        ? `/breed/${breed}/${sub}/images`
        : `/breed/${breed}/images`;

      let errorMessage: string;
      try {
        const result = await axios.get(url);

        if (result.status === 200) {
          dispatch({
            type: 'SET_IMAGES',
            payload: { imageUrls: shuffle(result.data.message) },
          });
        } else {
          errorMessage = result.statusText;
        }
      } catch (e) {
        errorMessage = 'Network error';
      }

      if (errorMessage) {
        dispatch({ type: 'SET_ERROR', payload: { errorMessage } });
      }
    };

    if (breedsLoaded) {
      if (shouldLoad) {
        getImages();
      }
    } else {
      getBreeds();
    }
  }, [breedsLoaded, getBreeds, breed, sub, shouldLoad]);

  const loadMore: () => void = () => {
    dispatch({ type: 'LOAD_MORE_IMAGES' });
  };

  const setImage: (imageIndex: number) => void = (imageIndex: number) => {
    dispatch({ type: 'SELECT_IMAGE', payload: { imageIndex } });
  };

  const changeImage: (delta: number) => void = (delta: number) => {
    dispatch({ type: 'CHANGE_IMAGE', payload: { delta } });
  };

  const getTop: () => JSX.Element = () => {
    if (props.match.params.sub) {
      return (
        <h2 className="subtitle is-capitalized">
          Breed:{' '}
          <Link to={`/breed/${props.match.params.breed}`}>
            {props.match.params.breed}
          </Link>
        </h2>
      );
    } else if (props.breeds[props.match.params.breed].length > 0) {
      return (
        <SubBreeds
          main={props.match.params.breed}
          subs={props.breeds[props.match.params.breed]}
        />
      );
    }
  };

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
  } else if (props.breedFound) {
    const top: JSX.Element = getTop();

    const title = props.match.params.sub
      ? props.match.params.sub.replace(/-/g, ' ') +
        ' ' +
        props.match.params.breed
      : props.match.params.breed;

    return (
      <Section>
        <React.Fragment>
          <h1 className="title is-capitalized">{title}</h1>
          {top}

          <hr />

          <h2 className="title is-size-4">Images</h2>
          <BreedGallery
            hasMore={state.numberOfImagesLoaded < state.imageUrls.length}
            imageError={state.imageError}
            imageUrls={state.imageUrls.slice(0, state.numberOfImagesLoaded)}
            isLoading={state.loadingImages}
            loadMore={loadMore}
            title={title}
            selectImage={setImage}
          />
          {state.selectedImage !== null ? (
            <ImageModal
              src={state.imageUrls[state.selectedImage]}
              onClose={() => setImage(null)}
              hasPrev={state.selectedImage > 0}
              hasNext={state.selectedImage < state.imageUrls.length - 1}
              onChange={changeImage}
            />
          ) : null}
        </React.Fragment>
      </Section>
    );
  }

  return (
    <Section>
      <ErrorMessage message="Breed not found" />
    </Section>
  );
};

const mapStateToProps = (state: AppState, ownProps: BreedInfoProps) => ({
  breedFound:
    state.breeds.breeds[ownProps.match.params.breed] &&
    (!ownProps.match.params.sub ||
      state.breeds.breeds[ownProps.match.params.breed].indexOf(
        ownProps.match.params.sub.replace(/-/g, ' ')
      ) > -1)
      ? true
      : false,
  breeds: state.breeds.breeds,
  breedsLoaded: state.breeds.breedNames.length > 0,
  error: state.breeds.error,
  loading: state.breeds.loading,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
  getBreeds: () => dispatch(getBreeds()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreedInfo);
