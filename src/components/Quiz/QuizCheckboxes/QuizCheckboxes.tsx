import React, { FunctionComponent } from 'react';
import Input from '../../Form/Input/Input';

interface QuizCheckboxesProps {
  checkboxes: { [breed: string]: boolean };
  changeValue: (breed: string, value: boolean) => void;
}

const QuizCheckboxes: FunctionComponent<QuizCheckboxesProps> = (
  props: QuizCheckboxesProps
) => {
  let initial: string;

  const checkboxes = Object.keys(props.checkboxes).map((breed: string) => {
    let separator = null;
    if (initial !== breed.charAt(0)) {
      initial = breed.charAt(0);
      separator = (
        <React.Fragment>
          <p className="label is-capitalized">{initial}</p>
        </React.Fragment>
      );
    }

    const key = breed.replace(/ /g, '-');

    const elementConfig = {
      checked: props.checkboxes[key],
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        props.changeValue(key, event.target.checked),
    };

    return (
      <React.Fragment key={key}>
        {separator}
        <Input
          elementType="checkbox"
          elementConfig={elementConfig}
          label={breed}
        />
      </React.Fragment>
    );
  });

  return <React.Fragment>{checkboxes}</React.Fragment>;
};

export default QuizCheckboxes;
