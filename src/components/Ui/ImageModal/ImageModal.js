import React from 'react';

import './ImageModal.css';

const imageModal = props => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.onClose} />
      <div className="modal-content">
        <p className="image">
          <img src={props.src} alt={props.alt} />
        </p>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={props.onClose}
      />
    </div>
  );
};

export default imageModal;
