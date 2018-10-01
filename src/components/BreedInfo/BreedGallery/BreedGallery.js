import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

import './BreedGallery.css';
import ErrorMessage from '../../Ui/ErrorMessage/ErrorMessage';
import Loading from '../../Ui/Loading/Loading';

const breedGallery = props => {
  if (props.imageError) {
    return <ErrorMessage message={props.imageError} />;
  } else if (props.isLoading) {
    return <Loading />;
  } else if (props.imageUrls.length > 0) {
    const images = props.imageUrls.map((val, idx) => (
      <div className="gallery-image" key={idx}>
        <LazyLoad height={200} offset={500} once>
          <img
            src={val}
            alt={`${props.title} #${idx + 1}`}
            onClick={() => props.selectImage(idx)}
          />
        </LazyLoad>
      </div>
    ));

    return (
      <InfiniteScroll
        className="gallery-container"
        loader={
          <div className="notification" key="loader">
            Loading more images...
          </div>
        }
        loadMore={props.loadMore}
        hasMore={props.hasMore}
        threshold={1000}
      >
        {images}
      </InfiniteScroll>
    );
  } else {
    return null;
  }
};

breedGallery.propTypes = {
  hasMore: PropTypes.bool,
  imageError: PropTypes.string,
  imageUrls: PropTypes.array,
  isLoading: PropTypes.bool,
  loadMore: PropTypes.func,
  selectImage: PropTypes.func,
  title: PropTypes.string,
};

breedGallery.defaultProps = {
  imageUrls: [],
};

export default breedGallery;
