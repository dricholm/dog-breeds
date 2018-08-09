import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import './BreedGallery.css';
import ErrorMessage from '../../Ui/ErrorMessage/ErrorMessage';
import Loading from '../../Ui/Loading/Loading';

const breedGallery = props => {
  let gallery = null;
  if (props.imageError) {
    gallery = <ErrorMessage message={props.imageError} />;
  } else if (props.isLoading) {
    gallery = <Loading />;
  } else if (props.imageUrls.length > 0) {
    const images = props.imageUrls.map((val, idx) => (
      <div className="gallery-image" key={idx}>
        <img
          src={val}
          alt={`${props.title} #${idx + 1}`}
          onClick={() => props.selectImage(val)}
        />
      </div>
    ));

    gallery = (
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
  }

  return gallery;
};

export default breedGallery;
