import React from 'react';
import { shallow } from 'enzyme';

import ImageModal from './ImageModal';

describe('<ImageModal />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ImageModal />);
  });

  it('should display image', () => {
    wrapper.setProps({ src: 'test.jpg' });
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').props().src).toBe('test.jpg');
  });

  it('should call close on background click', () => {
    const onClose = jest.fn();
    wrapper.setProps({ onClose });

    expect(onClose).toHaveBeenCalledTimes(0);
    wrapper.find('.modal-background').simulate('click');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call close on button click', () => {
    const onClose = jest.fn();
    wrapper.setProps({ onClose });

    expect(onClose).toHaveBeenCalledTimes(0);
    wrapper.find('.modal-close').simulate('click');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should display prev', () => {
    wrapper.setProps({ hasPrev: true });
    expect(wrapper.find('.modal-prev').exists()).toBe(true);
  });

  it('should display next', () => {
    wrapper.setProps({ hasNext: true });
    expect(wrapper.find('.modal-next').exists()).toBe(true);
  });

  it('should not display prev', () => {
    wrapper.setProps({ hasPrev: false });
    expect(wrapper.find('.modal-prev').exists()).toBe(false);
  });

  it('should not display next', () => {
    wrapper.setProps({ hasNext: false });
    expect(wrapper.find('.modal-next').exists()).toBe(false);
  });

  it('should call onChange with -1', () => {
    const onChange = jest.fn();
    wrapper.setProps({ hasPrev: true, onChange });

    expect(onChange).toHaveBeenCalledTimes(0);
    wrapper.find('.modal-prev').simulate('click');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(-1);
  });

  it('should call onChange with 1', () => {
    const onChange = jest.fn();
    wrapper.setProps({ hasNext: true, onChange });

    expect(onChange).toHaveBeenCalledTimes(0);
    wrapper.find('.modal-next').simulate('click');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
