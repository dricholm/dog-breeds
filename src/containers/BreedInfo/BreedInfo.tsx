import React, {
  FunctionComponent,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

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

const BreedInfo: FunctionComponent = () => {
  const [state, dispatch] = useReducer(breedInfoReducer, initialState);

  const { breed, sub } = useParams();

  const { breeds, breedNames, error, loading } = useSelector(
    (state: AppState) => state.breeds
  );

  const breedFound =
    breeds[breed] &&
    (!sub || breeds[breed].indexOf(sub.replace(/-/g, ' ')) > -1);
  const breedsLoaded = breedNames.length > 0;

  const reduxDispatch = useDispatch();
  const dispatchGetBreeds = useCallback(() => reduxDispatch(getBreeds()), [
    reduxDispatch,
  ]);

  const shouldLoad =
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
      dispatchGetBreeds();
    }
  }, [breedsLoaded, dispatchGetBreeds, breed, sub, shouldLoad]);

  const loadMore = () => {
    dispatch({ type: 'LOAD_MORE_IMAGES' });
  };

  const setImage = (imageIndex: number) => {
    dispatch({ type: 'SELECT_IMAGE', payload: { imageIndex } });
  };

  const changeImage = (delta: number) => {
    dispatch({ type: 'CHANGE_IMAGE', payload: { delta } });
  };

  const getTop: () => JSX.Element = () => {
    if (sub) {
      return (
        <h2 className="subtitle is-capitalized">
          Breed: <Link to={`/breed/${breed}`}>{breed}</Link>
        </h2>
      );
    } else if (breeds[breed].length > 0) {
      return <SubBreeds main={breed} subs={breeds[breed]} />;
    }
  };

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
  } else if (breedFound) {
    const top: JSX.Element = getTop();

    const title = sub ? sub.replace(/-/g, ' ') + ' ' + breed : breed;

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

export default BreedInfo;
