import React, { FunctionComponent } from 'react';

interface SectionProps {
  children: any;
}

const Section: FunctionComponent<SectionProps> = (props: SectionProps) => (
  <section className="section">
    <div className="container">{props.children}</div>
  </section>
);

export default Section;
