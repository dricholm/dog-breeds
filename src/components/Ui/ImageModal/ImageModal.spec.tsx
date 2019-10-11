import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import ImageModal from './ImageModal';

describe('<ImageModal />', () => {
  const src = 'test.jpg';
  const alt = 'Image alt';
  const onChange = jest.fn();
  const onClose = jest.fn();

  afterEach(() => {
    onChange.mockClear();
    onClose.mockClear();
  });

  it('should display image', () => {
    const utils = render(
      <ImageModal src={src} onChange={onChange} onClose={onClose} alt={alt} />
    );

    const img = utils.getByAltText(alt);
    expect(img.getAttribute('src')).toBe(src);
  });

  it('should call close on background click', () => {
    const utils = render(
      <ImageModal src={src} onChange={onChange} onClose={onClose} alt={alt} />
    );

    expect(onClose).toHaveBeenCalledTimes(0);
    const background = utils.container.querySelector('.modal-background');
    fireEvent.click(background);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call close on button click', () => {
    const utils = render(
      <ImageModal src={src} onChange={onChange} onClose={onClose} alt={alt} />
    );

    expect(onClose).toHaveBeenCalledTimes(0);
    const close = utils.getByLabelText('Close');
    fireEvent.click(close);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should display prev', () => {
    const utils = render(
      <ImageModal
        src={src}
        onChange={onChange}
        onClose={onClose}
        alt={alt}
        hasPrev={true}
      />
    );

    utils.getByLabelText('Previous');
  });

  it('should display next', () => {
    const utils = render(
      <ImageModal
        src={src}
        onChange={onChange}
        onClose={onClose}
        alt={alt}
        hasNext={true}
      />
    );

    utils.getByLabelText('Next');
  });

  it('should not display prev', () => {
    const utils = render(
      <ImageModal
        src={src}
        onChange={onChange}
        onClose={onClose}
        alt={alt}
        hasPrev={false}
      />
    );

    expect(utils.queryByLabelText('Previous')).toBeNull();
  });

  it('should not display next', () => {
    const utils = render(
      <ImageModal
        src={src}
        onChange={onChange}
        onClose={onClose}
        alt={alt}
        hasNext={false}
      />
    );

    expect(utils.queryByLabelText('Next')).toBeNull();
  });

  it('should call onChange with -1', () => {
    const utils = render(
      <ImageModal
        src={src}
        onChange={onChange}
        onClose={onClose}
        alt={alt}
        hasPrev={true}
        hasNext={true}
      />
    );

    expect(onChange).toHaveBeenCalledTimes(0);
    const prev = utils.getByLabelText('Previous');
    fireEvent.click(prev);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(-1);
  });

  it('should call onChange with 1', () => {
    const utils = render(
      <ImageModal
        src={src}
        onChange={onChange}
        onClose={onClose}
        alt={alt}
        hasPrev={true}
        hasNext={true}
      />
    );

    expect(onChange).toHaveBeenCalledTimes(0);
    const prev = utils.getByLabelText('Next');
    fireEvent.click(prev);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('should call onClose when escape is pressed', () => {
    const utils = render(
      <ImageModal
        src={src}
        onChange={onChange}
        onClose={onClose}
        alt={alt}
        hasPrev={true}
        hasNext={true}
      />
    );

    expect(onClose).toHaveBeenCalledTimes(0);
    fireEvent.keyUp(utils.container, { key: 'Escape', keyCode: '27' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onChange when left is pressed', () => {
    const utils = render(
      <ImageModal
        src={src}
        onChange={onChange}
        onClose={onClose}
        alt={alt}
        hasPrev={true}
        hasNext={true}
      />
    );

    expect(onChange).toHaveBeenCalledTimes(0);
    fireEvent.keyUp(utils.container, { key: 'ArrowLeft', keyCode: '37' });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(-1);
  });

  it('should call onChange when right is pressed', () => {
    const utils = render(
      <ImageModal
        src={src}
        onChange={onChange}
        onClose={onClose}
        alt={alt}
        hasPrev={true}
        hasNext={true}
      />
    );

    expect(onChange).toHaveBeenCalledTimes(0);
    fireEvent.keyUp(utils.container, { key: 'ArrowRight', keyCode: '39' });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('should not call functions when a random key is pressed', () => {
    const utils = render(
      <ImageModal
        src={src}
        onChange={onChange}
        onClose={onClose}
        alt={alt}
        hasPrev={true}
        hasNext={true}
      />
    );

    fireEvent.keyUp(utils.container, { key: 'ArrowUp', keyCode: '38' });
    expect(onChange).toHaveBeenCalledTimes(0);
    expect(onClose).toHaveBeenCalledTimes(0);
  });
});
