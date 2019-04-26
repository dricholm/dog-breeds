import React, { FunctionComponent, useEffect, useState } from 'react';
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

interface BreedInfoProps {
  breedFound: boolean;
  breeds: { [breed: string]: Array<string> };
  breedsLoaded: boolean;
  error: string;
  getBreeds: () => void;
  loading: boolean;
  match: any;
}

interface BreedInfoState {
  breedNames: Array<string>;
  breeds: { [breed: string]: Array<string> };
  currentBreed: { main?: string; sub?: string };
  error: string;
  imageError: string;
  imageUrls: Array<string>;
  loading: boolean;
  loadingImages: boolean;
  numberOfImagesLoaded: number;
  selectedImage: number;
}

const BreedInfo: FunctionComponent<BreedInfoProps> = (
  props: BreedInfoProps
) => {
  const initialState: BreedInfoState = {
    breedNames: [],
    breeds: {},
    currentBreed: {},
    error: null,
    imageError: null,
    imageUrls: [],
    loading: null,
    loadingImages: null,
    numberOfImagesLoaded: null,
    selectedImage: null,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (props.breedsLoaded) {
      if (shouldLoadImages()) {
        getImages();
      }
    } else {
      props.getBreeds();
    }
  }, []);

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

  const shouldLoadImages: () => boolean = () =>
    state.currentBreed.main !== props.match.params.breed ||
    props.match.params.sub !== state.currentBreed.sub ||
    (state.imageUrls.length === 0 && !state.imageError && !state.loadingImages);

  const getImages: () => Promise<void> = async () => {
    setState({
      ...state,
      currentBreed: {
        main: props.match.params.breed,
        sub: props.match.params.sub,
      },
      imageError: null,
      imageUrls: [],
      loadingImages: true,
      numberOfImagesLoaded: 0,
    });

    const url = props.match.params.sub
      ? `/breed/${props.match.params.breed}/${props.match.params.sub}/images`
      : `/breed/${props.match.params.breed}/images`;

    let errorMessage: string;
    try {
      const result = await axios.get(url);
      if (result.status === 200) {
        setState({
          ...state,
          currentBreed: { ...state.currentBreed },
          imageError: null,
          imageUrls: shuffle(result.data.message),
          loadingImages: false,
          numberOfImagesLoaded: 10,
        });
      } else {
        errorMessage = result.statusText;
      }
    } catch (e) {
      errorMessage = 'Network error';
    }

    if (errorMessage) {
      setState({
        ...state,
        currentBreed: { ...state.currentBreed },
        imageError: errorMessage,
        imageUrls: [],
        loadingImages: false,
      });
    }
  };

  const loadMore: () => void = () => {
    setState((prevState: BreedInfoState) => ({
      ...prevState,
      currentBreed: { ...prevState.currentBreed },
      numberOfImagesLoaded: prevState.numberOfImagesLoaded + 10,
    }));
  };

  const setImage: (imageIndex: number) => void = (imageIndex: number) => {
    setState((prevState: BreedInfoState) => ({
      ...prevState,
      currentBreed: { ...prevState.currentBreed },
      selectedImage: imageIndex,
    }));
  };

  const changeImage: (delta: number) => void = (delta: number) => {
    setState((prevState: BreedInfoState) => ({
      ...prevState,
      currentBreed: { ...prevState.currentBreed },
      numberOfImagesLoaded:
        prevState.selectedImage + delta >= prevState.numberOfImagesLoaded
          ? prevState.selectedImage + delta + 1
          : prevState.numberOfImagesLoaded,
      selectedImage: prevState.selectedImage + delta,
    }));
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
