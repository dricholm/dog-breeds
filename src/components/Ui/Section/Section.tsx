import React from 'react';

export interface SectionProps {
  children: any;
}
const section = (props: SectionProps) => (
  <section className="section">
    <div className="container">{props.children}</div>
  </section>
);

export default section;
