import React from 'react';

export interface ErrorMessageProps {
  message: string;
};

const errorMessage = (props: ErrorMessageProps) => (
  <div className="notification is-danger is-size-5">{props.message}</div>
);

export default errorMessage;
