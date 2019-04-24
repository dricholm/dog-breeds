import React from 'react';

export interface ToggleHideProps {
  click: () => void;
  shown: boolean;
}

const toggleHide = (
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

export default toggleHide;
