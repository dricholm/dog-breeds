import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

export interface SubBreedsProps {
  main: string;
  subs: Array<string>;
}

const SubBreeds: FunctionComponent<SubBreedsProps> = (
  props: SubBreedsProps
) => {
  const subs = props.subs
    .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
    .map(val => (
      <li key={val}>
        <Link to={`/breed/${props.main}/${val}`}>
          {val} {props.main}
        </Link>
      </li>
    ));

  return (
    <React.Fragment>
      <h2 className="title is-size-4">Sub breeds</h2>
      <ul className="is-size-5 is-capitalized">{subs}</ul>
    </React.Fragment>
  );
};

SubBreeds.defaultProps = {
  subs: [],
};

export default SubBreeds;
