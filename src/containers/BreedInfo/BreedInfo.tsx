import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import axios from '../../shared/axiosDogApi';
import BreedGallery from '../../components/BreedInfo/BreedGallery/BreedGallery';
import ErrorMessage from '../../components/Ui/ErrorMessage/ErrorMessage';
import ImageModal from '../../components/Ui/ImageModal/ImageModal';
import Loading from '../../components/Ui/Loading/Loading';
import Section from '../../components/Ui/Section/Section';
import SubBreeds from '../../components/BreedInfo/SubBreeds/SubBreeds';
import { BreedState, initialBreedState } from '../../store/breed/types';
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

class BreedInfo extends Component<BreedInfoProps, BreedInfoState> {
  state: BreedInfoState = {
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

  componentDidMount() {
    if (this.props.breedsLoaded) {
      if (this.shouldLoadImages()) this.getImages();
    } else {
      this.props.getBreeds();
    }
  }

  UNSAFE_componentWillReceiveProps() {
    if (this.shouldLoadImages()) this.getImages();
  }

  componentDidUpdate() {
    if (this.shouldLoadImages()) this.getImages();
  }

  shuffle = (array: Array<string>) => {
    const ret = array.slice();
    for (let i = ret.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ret[i], ret[j]] = [ret[j], ret[i]];
    }
    return ret;
  };

  shouldLoadImages = () =>
    this.state.currentBreed.main !== this.props.match.params.breed ||
    this.props.match.params.sub !== this.state.currentBreed.sub ||
    (this.state.imageUrls.length === 0 &&
      !this.state.imageError &&
      !this.state.loadingImages);

  getImages = async () => {
    this.setState({
      ...this.state,
      currentBreed: {
        main: this.props.match.params.breed,
        sub: this.props.match.params.sub,
      },
      imageError: null,
      imageUrls: [],
      loadingImages: true,
      numberOfImagesLoaded: 0,
    });

    const url = this.props.match.params.sub
      ? `/breed/${this.props.match.params.breed}/${
          this.props.match.params.sub
        }/images`
      : `/breed/${this.props.match.params.breed}/images`;
    let errorMessage;
    try {
      const result = await axios.get(url);
      if (result.status === 200) {
        this.setState({
          ...this.state,
          currentBreed: { ...this.state.currentBreed },
          imageError: null,
          imageUrls: this.shuffle(result.data.message),
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
      this.setState({
        ...this.state,
        currentBreed: { ...this.state.currentBreed },
        imageError: errorMessage,
        imageUrls: [],
        loadingImages: false,
      });
    }
  };

  loadMore = () => {
    this.setState((prevState: BreedInfoState) => ({
      ...prevState,
      currentBreed: { ...prevState.currentBreed },
      numberOfImagesLoaded: prevState.numberOfImagesLoaded + 10,
    }));
  };

  setImage = (imageIndex: number) => {
    this.setState((prevState: BreedInfoState) => ({
      ...prevState,
      currentBreed: { ...prevState.currentBreed },
      selectedImage: imageIndex,
    }));
  };

  changeImage = (delta: number) => {
    this.setState((prevState: BreedInfoState) => ({
      ...prevState,
      currentBreed: { ...prevState.currentBreed },
      numberOfImagesLoaded:
        prevState.selectedImage + delta >= prevState.numberOfImagesLoaded
          ? prevState.selectedImage + delta + 1
          : prevState.numberOfImagesLoaded,
      selectedImage: prevState.selectedImage + delta,
    }));
  };

  render() {
    let content;

    if (this.props.loading) {
      content = <Loading />;
    } else if (this.props.error) {
      content = <ErrorMessage message={this.props.error} />;
    } else if (this.props.breedFound) {
      let top: JSX.Element;
      if (this.props.match.params.sub) {
        top = (
          <h2 className="subtitle is-capitalized">
            Breed:{' '}
            <Link to={`/breed/${this.props.match.params.breed}`}>
              {this.props.match.params.breed}
            </Link>
          </h2>
        );
      } else if (this.props.breeds[this.props.match.params.breed].length > 0) {
        top = (
          <SubBreeds
            main={this.props.match.params.breed}
            subs={this.props.breeds[this.props.match.params.breed]}
          />
        );
      }

      const title = this.props.match.params.sub
        ? this.props.match.params.sub.replace(/-/g, ' ') +
          ' ' +
          this.props.match.params.breed
        : this.props.match.params.breed;

      content = (
        <React.Fragment>
          <h1 className="title is-capitalized">{title}</h1>
          {top}

          <hr />

          <h2 className="title is-size-4">Images</h2>
          <BreedGallery
            hasMore={
              this.state.numberOfImagesLoaded < this.state.imageUrls.length
            }
            imageError={this.state.imageError}
            imageUrls={this.state.imageUrls.slice(
              0,
              this.state.numberOfImagesLoaded
            )}
            isLoading={this.state.loadingImages}
            loadMore={this.loadMore}
            title={title}
            selectImage={this.setImage}
          />
          {this.state.selectedImage !== null ? (
            <ImageModal
              src={this.state.imageUrls[this.state.selectedImage]}
              onClose={() => this.setImage(null)}
              hasPrev={this.state.selectedImage > 0}
              hasNext={
                this.state.selectedImage < this.state.imageUrls.length - 1
              }
              onChange={this.changeImage}
            />
          ) : null}
        </React.Fragment>
      );
    } else {
      content = <ErrorMessage message="Breed not found" />;
    }

    return <Section>{content}</Section>;
  }
}

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