import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent, useEffect } from 'react';
import './ImageModal.scss';

interface ImageModalProps {
  hasNext?: boolean;
  hasPrev?: boolean;
  onChange: (direction: number) => void;
  onClose: () => void;
  src: string;
  alt?: string;
}

const ImageModal: FunctionComponent<ImageModalProps> = (
  props: ImageModalProps
) => {
  useEffect(() => {
    document.addEventListener('keyup', keyUp);

    return () => {
      document.removeEventListener('keyup', keyUp);
    };
  });

  const keyUp = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case 27: // Escape
        props.onClose();
        break;

      case 37: // Left
        if (props.hasPrev) {
          props.onChange(-1);
        }
        break;

      case 39: // Right
        if (props.hasNext) {
          props.onChange(1);
        }
        break;

      default:
        break;
    }
  };

  const image = [0].map(() => (
    <img
      className="modal-image"
      src={props.src}
      alt={props.alt}
      key={props.src}
    />
  ));

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.onClose} />
      {image}
      <button
        className="modal-close is-large"
        aria-label="Close"
        onClick={props.onClose}
      />
      {props.hasPrev ? (
        <button
          className="button is-large is-dark modal-prev"
          aria-label="Previous"
          onClick={() => props.onChange(-1)}
        >
          <FontAwesomeIcon icon="chevron-left" fixedWidth />
        </button>
      ) : null}
      {props.hasNext ? (
        <button
          className="button is-large is-dark modal-next"
          aria-label="Next"
          onClick={() => props.onChange(1)}
        >
          <FontAwesomeIcon icon="chevron-right" fixedWidth />
        </button>
      ) : null}
    </div>
  );
};

ImageModal.defaultProps = {
  hasNext: false,
  hasPrev: false,
  alt: 'Large version',
};

export default ImageModal;
