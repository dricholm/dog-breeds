import React, { FunctionComponent } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import LazyLoad from 'react-lazyload';

import './BreedGallery.css';
import ErrorMessage from '../../Ui/ErrorMessage/ErrorMessage';
import Loading from '../../Ui/Loading/Loading';

export interface BreedGalleryProps {
  hasMore: boolean;
  imageError: string;
  imageUrls: Array<string>;
  isLoading: boolean;
  loadMore: () => void;
  selectImage: (index: number) => void;
  title: string;
}

const BreedGallery: FunctionComponent<BreedGalleryProps> = (
  props: BreedGalleryProps
) => {
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

BreedGallery.defaultProps = {
  imageUrls: [],
};

export default BreedGallery;
