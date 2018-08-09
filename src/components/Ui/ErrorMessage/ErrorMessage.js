import React from 'react';
import PropTypes from 'prop-types';

const errorMessage = props => (
  <div className="notification is-danger is-size-5">{props.message}</div>
);

errorMessage.propTypes = {
  message: PropTypes.string,
};

export default errorMessage;
