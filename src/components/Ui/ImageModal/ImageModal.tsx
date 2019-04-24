import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ImageModal.css';

interface ImageModalProps {
  hasNext: boolean;
  hasPrev: boolean;
  onChange: (direction: number) => void;
  onClose: () => void;
  src: string;
}

class ImageModal extends Component<ImageModalProps> {
  static defaultProps = {
    hasNext: false,
    hasPrev: false,
    src: '#',
  };

  componentDidMount() {
    document.addEventListener('keyup', this.keyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.keyUp);
  }

  keyUp = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case 27: // Escape
        this.props.onClose();
        break;

      case 37: // Left
        if (this.props.hasPrev) {
          this.props.onChange(-1);
        }
        break;

      case 39: // Right
        if (this.props.hasNext) {
          this.props.onChange(1);
        }
        break;

      default:
        break;
    }
  };

  render() {
    const image = [0].map(() => (
      <img
        className="modal-image"
        src={this.props.src}
        alt="Large version"
        key={this.props.src}
      />
    ));

    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={this.props.onClose} />
        {image}
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={this.props.onClose}
        />
        {this.props.hasPrev ? (
          <button
            className="button is-large is-dark modal-prev"
            aria-label="previous"
            onClick={() => this.props.onChange(-1)}
          >
            <FontAwesomeIcon icon="chevron-left" fixedWidth />
          </button>
        ) : null}
        {this.props.hasNext ? (
          <button
            className="button is-large is-dark modal-next"
            aria-label="next"
            onClick={() => this.props.onChange(1)}
          >
            <FontAwesomeIcon icon="chevron-right" fixedWidth />
          </button>
        ) : null}
      </div>
    );
  }
}

export default ImageModal;
