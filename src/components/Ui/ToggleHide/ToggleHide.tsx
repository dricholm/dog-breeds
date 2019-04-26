import React, { FunctionComponent } from 'react';

interface ToggleHideProps {
  click: () => void;
  shown: boolean;
}

const ToggleHide: FunctionComponent<ToggleHideProps> = (
  props: ToggleHideProps & React.HTMLAttributes<HTMLButtonElement>
) => (
  <button
    className={props.shown ? 'button is-light' : 'button is-primary'}
    type="button"
    onClick={props.click}
  >
    {props.shown ? 'Hide' : 'Show'}
  </button>
);

export default ToggleHide;
