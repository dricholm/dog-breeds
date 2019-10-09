import React, { FunctionComponent } from 'react';

export interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = (
  props: ErrorMessageProps
) => (
  <div className="notification is-danger is-size-5" role="alert">
    {props.message}
  </div>
);

export default ErrorMessage;
