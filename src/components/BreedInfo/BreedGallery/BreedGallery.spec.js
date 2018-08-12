import React from 'react';
import { shallow } from 'enzyme';

import ErrorMessage from '../../Ui/ErrorMessage/ErrorMessage';
import Loading from '../../Ui/Loading/Loading';
import BreedGallery from './BreedGallery';

describe('<BreedGallery />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BreedGallery />);
  });

  it('should display error message when error is passed', () => {
    wrapper.setProps({ imageError: 'Test error message' });
    expect(wrapper.find(ErrorMessage).exists()).toBe(true);
    expect(wrapper.find(Loading).exists()).toBe(false);
    expect(wrapper.find('.gallery-image').exists()).toBe(false);
    expect(wrapper.find(ErrorMessage).props().message).toBe(
      'Test error message'
    );
  });

  it('should display loading', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find(ErrorMessage).exists()).toBe(false);
    expect(wrapper.find(Loading).exists()).toBe(true);
    expect(wrapper.find('.gallery-image').exists()).toBe(false);
  });

  it('should display images', () => {
    wrapper.setProps({
      imageUrls: ['a.jpg', 'b.jpg'],
      loadMore: () => null,
    });
    expect(wrapper.find(ErrorMessage).exists()).toBe(false);
    expect(wrapper.find(Loading).exists()).toBe(false);
    expect(wrapper.find('.gallery-image').exists()).toBe(true);

    const imgs = wrapper.find('img');
    expect(imgs).toHaveLength(2);
    expect(imgs.at(0).props().src).toBe('a.jpg');
    expect(imgs.at(1).props().src).toBe('b.jpg');
  });

  it('should call selectImage on click', () => {
    const onClick = jest.fn();
    wrapper.setProps({
      imageUrls: ['a.jpg'],
      loadMore: () => null,
      selectImage: onClick,
    });
    expect(wrapper.find(ErrorMessage).exists()).toBe(false);
    expect(wrapper.find(Loading).exists()).toBe(false);
    expect(wrapper.find('.gallery-image').exists()).toBe(true);

    const imgs = wrapper.find('img');
    expect(onClick).toHaveBeenCalledTimes(0);
    imgs.at(0).simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
