import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import BreedGallery from './BreedGallery';

describe('<BreedGallery />', () => {
  it('should display error message when error is passed', () => {
    const errorMessage = 'Test error message';
    const utils = render(
      <BreedGallery
        imageError={errorMessage}
        loadMore={() => null}
        selectImage={() => null}
      />
    );

    const alert = utils.getByRole('alert');
    expect(alert.textContent).toBe(errorMessage);
    expect(utils.queryByLabelText('Loading')).toBeNull();
    expect(utils.container.querySelector('img')).toBeNull();
  });

  it('should display loading', () => {
    const utils = render(
      <BreedGallery
        isLoading={true}
        loadMore={() => null}
        selectImage={() => null}
      />
    );

    utils.getByLabelText('Loading');
    expect(utils.container.querySelector('img')).toBeNull();
  });

  it('should display images', () => {
    const imageUrls = ['a.jpg', 'b.jpg'];
    const loadMore = jest.fn();
    const title = 'Test title';
    const utils = render(
      <BreedGallery
        imageUrls={imageUrls}
        loadMore={loadMore}
        title={title}
        selectImage={() => null}
      />
    );

    const images = utils.container.querySelectorAll('img');
    expect(images.length).toBe(imageUrls.length);
    imageUrls.forEach((url, idx) => {
      expect(images[idx].getAttribute('src')).toBe(url);
      expect(images[idx].getAttribute('alt')).toBe(`${title} #${idx + 1}`);
    });
    expect(utils.queryByLabelText('Loading')).toBeNull();
  });

  it('should call selectImage on click', () => {
    const selectImage = jest.fn();
    const loadMore = jest.fn();
    const utils = render(
      <BreedGallery
        imageUrls={['a.jpg']}
        title={'Test'}
        selectImage={selectImage}
        loadMore={loadMore}
      />
    );

    fireEvent.click(utils.container.querySelector('img'));

    expect(selectImage).toHaveBeenCalledWith(0);
  });
});
