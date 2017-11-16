import React from 'react';

const errorMessage = props => (
  <div className="notification is-danger is-size-5">
    {props.message}
  </div>
);

export default errorMessage;
