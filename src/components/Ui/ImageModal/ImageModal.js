import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ImageModal.css';

class ImageModal extends Component {
  componentDidMount() {
    document.addEventListener('keyup', this.keyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.keyUp);
  }

  keyUp = event => {
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
    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={this.props.onClose} />
        <img className="modal-image" src={this.props.src} alt="Large version" />
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

ImageModal.propTypes = {
  hasNext: PropTypes.bool,
  hasPrev: PropTypes.bool,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  src: PropTypes.string,
};

ImageModal.defaultProps = {
  hasNext: false,
  hasPrev: false,
};

export default ImageModal;
