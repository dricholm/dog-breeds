import React from 'react';

import Section from '../Ui/Section/Section'

const about = () => (
  <Section>
    <h1 className="title is-capitalized">
      About
    </h1>

    <div className="content is-size-5">
      <p>
        This is an open source website made in React. It uses the <a href="https://dog.ceo/dog-api/">Dog API</a> for fetching breed names and images.
      </p>
      <p>
        You can find the source code on <a href="https://github.com/dricholm/dog-breeds">GitHub</a>. Feel free to add issues if you found some. Forks and improvements are also welcome.
      </p>
    </div>
  </Section>
);

export default about;
