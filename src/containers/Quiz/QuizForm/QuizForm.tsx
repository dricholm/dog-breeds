import React, {
  FormEvent,
  FunctionComponent,
  useState,
  useEffect,
} from 'react';
import { connect } from 'react-redux';

import * as breedActions from '../../../store/breed/actions';
import * as quizActions from '../../../store/quiz/actions';
import Input from '../../../components/Form/Input/Input';
import ToggleHide from '../../../components/Ui/ToggleHide/ToggleHide';
import ErrorMessage from '../../../components/Ui/ErrorMessage/ErrorMessage';
import Loading from '../../../components/Ui/Loading/Loading';
import { BreedState } from '../../../store/breed/types';
import { AppState } from '../../../store';
import QuizCheckboxes from '../../../components/Quiz/QuizCheckboxes/QuizCheckboxes';

interface QuizFormProps {
  breeds: BreedState;
  getBreeds: () => void;
  history: any;
  setOptions: (questionNumber: string, checked: Array<string>) => void;
}

interface QuizFormState {
  checkboxes: { [name: string]: boolean };
  isValid: boolean;
  questions: {
    elementConfig: {
      max: string;
      min: string;
      name: string;
      placeholder: string;
      required: boolean;
      type: string;
      value: string;
    };
    elementType: string;
    touched: boolean;
  };
  showCheckboxes: boolean;
}

const QuizForm: FunctionComponent<QuizFormProps> = (props: QuizFormProps) => {
  const initialState: QuizFormState = {
    checkboxes: {},
    isValid: true,
    questions: {
      elementConfig: {
        max: '100',
        min: '1',
        name: 'questions',
        placeholder: '1-100',
        required: true,
        type: 'number',
        value: '20',
      },
      elementType: 'input',
      touched: false,
    },
    showCheckboxes: false,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (props.breeds.breedNames.length === 0) {
      props.getBreeds();
    } else {
      initCheckboxes(props.breeds.breedNames);
    }
  }, [props.breeds]);

  const questionsChanged: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      questions: {
        ...state.questions,
        elementConfig: {
          ...state.questions.elementConfig,
          value: event.target.value,
        },
        touched: true,
      },
    });
  };

  const checkboxChanged: (breed: string, value: boolean) => void = (
    breed: string,
    value: boolean
  ) => {
    setState({
      ...state,
      checkboxes: {
        ...state.checkboxes,
        [breed]: value,
      },
    });
  };

  const checkAll: (checked: boolean) => void = (checked: boolean) => {
    let checkboxes = {};
    props.breeds.breedNames.forEach((breed: string) => {
      const key = breed.replace(/ /g, '-');

      checkboxes = {
        ...checkboxes,
        [key]: checked,
      };
    });

    setState({
      ...state,
      checkboxes: checkboxes,
    });
  };

  const initCheckboxes: (breedNames: Array<string>) => void = (
    breedNames: Array<string>
  ) => {
    const checkboxes = {};
    breedNames.forEach(breed => (checkboxes[breed.replace(/ /g, '-')] = true));

    setState({
      ...state,
      checkboxes,
    });
  };

  const submit: (event: FormEvent<HTMLFormElement>) => void = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (state.questions.elementConfig.value === '') {
      setState({
        ...state,
        isValid: false,
      });
      return;
    }

    const checked: Array<string> = [];
    Object.keys(state.checkboxes).forEach(box => {
      if (state.checkboxes[box]) {
        checked.push(box);
      }
    });
    if (checked.length > 1) {
      props.setOptions(state.questions.elementConfig.value, checked);
      props.history.push('/quiz/game');
    } else {
      setState({
        ...state,
        isValid: false,
      });
    }
  };

  const toggleHide: () => void = () => {
    setState((prevState: QuizFormState) => ({
      ...prevState,
      showCheckboxes: !prevState.showCheckboxes,
    }));
  };

  let breedCheckboxes: any;
  const checkBoxesClasses = ['control'];
  if (!state.showCheckboxes) {
    checkBoxesClasses.push('d-none');
  }

  if (props.breeds.loading) {
    breedCheckboxes = <Loading />;
  } else if (props.breeds.error) {
    breedCheckboxes = <ErrorMessage message={props.breeds.error} />;
  } else if (Object.keys(state.checkboxes).length > 0) {
    breedCheckboxes = (
      <QuizCheckboxes
        checkboxes={state.checkboxes}
        changeValue={checkboxChanged}
      />
    );
  }

  const checkedCount = Object.keys(state.checkboxes).filter(val => {
    return state.checkboxes[val];
  });

  return (
    <form onSubmit={submit} action="#">
      <div className="field columns">
        <div className="control column is-narrow">
          <label htmlFor="questions" className="label">
            Number of questions
          </label>
          <Input
            elementType={state.questions.elementType}
            elementConfig={{
              ...state.questions.elementConfig,
              onChange: questionsChanged,
            }}
            touched={state.questions.touched}
          />
        </div>
      </div>

      <div className="level">
        <div className="level-left">
          <p className="label level-item">
            Select which breeds you want to test on ({checkedCount.length})
          </p>
          <ToggleHide
            className="level-item"
            shown={state.showCheckboxes}
            click={toggleHide}
          />
        </div>
      </div>
      <div className="field">
        <div className={checkBoxesClasses.join(' ')}>{breedCheckboxes}</div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            className="button is-link"
            type="button"
            onClick={() => checkAll(true)}
          >
            Select all
          </button>
        </div>
        <div className="control">
          <button
            className="button is-link"
            type="button"
            onClick={() => checkAll(false)}
          >
            Select none
          </button>
        </div>
      </div>

      {state.isValid ? null : (
        <p className="notification is-warning">
          Please choose at least two breeds
        </p>
      )}

      <div className="field">
        <div className="control has-text-centered">
          <button className="button is-medium is-link is-success" type="submit">
            Start quiz
          </button>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state: AppState) => ({
  breeds: state.breeds,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
  getBreeds: () => dispatch(breedActions.getBreeds()),
  setOptions: (questionNumber: number, selectedBreeds: Array<string>) =>
    dispatch(quizActions.setOptions(questionNumber, selectedBreeds)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizForm);
