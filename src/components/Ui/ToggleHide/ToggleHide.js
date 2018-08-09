import React from 'react';
import PropTypes from 'prop-types';

const toggleHide = props => (
  <button
    className={props.shown ? 'button is-light' : 'button is-primary'}
    type="button"
    onClick={props.click}
  >
    {props.shown ? 'Hide' : 'Show'}
  </button>
);

toggleHide.propTypes = {
  click: PropTypes.func,
  shown: PropTypes.bool,
};

export default toggleHide;
