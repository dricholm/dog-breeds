import React, {
  FormEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Input from '../../../components/Form/Input/Input';
import QuizCheckboxes from '../../../components/Quiz/QuizCheckboxes/QuizCheckboxes';
import ErrorMessage from '../../../components/Ui/ErrorMessage/ErrorMessage';
import Loading from '../../../components/Ui/Loading/Loading';
import ToggleHide from '../../../components/Ui/ToggleHide/ToggleHide';
import { AppState } from '../../../store';
import * as breedActions from '../../../store/breed/actions';
import * as quizActions from '../../../store/quiz/actions';
import { initialState, quizFormReducer } from './reducers';

const QuizForm: FunctionComponent = () => {
  const breeds = useSelector((state: AppState) => state.breeds);

  const history = useHistory();

  const reduxDispatch = useDispatch();
  const getBreeds = useCallback(() => reduxDispatch(breedActions.getBreeds()), [
    reduxDispatch,
  ]);
  const setOptions = (questionNumber: number, selectedBreeds: Array<string>) =>
    reduxDispatch(quizActions.setOptions(questionNumber, selectedBreeds));

  const [state, dispatch] = useReducer(quizFormReducer, initialState);
  const { breedNames } = breeds;
  const breedsLoaded = breeds.breedNames.length > 0;

  useEffect(() => {
    const initCheckboxes: (breedNames: Array<string>) => void = (
      breedNames: Array<string>
    ) => {
      const checkboxes = {};
      breedNames.forEach(
        breed => (checkboxes[breed.replace(/ /g, '-')] = true)
      );

      dispatch({ type: 'SET_CHECKBOXES', payload: { checkboxes } });
    };

    if (breedsLoaded) {
      initCheckboxes(breedNames);
    } else {
      getBreeds();
    }
  }, [breedsLoaded, getBreeds, breedNames]);

  const questionsChanged: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_QUESTION_NUMBER',
      payload: { questionNumber: event.target.value },
    });
  };

  const checkboxChanged: (breed: string, value: boolean) => void = (
    breed: string,
    value: boolean
  ) => {
    dispatch({
      type: 'SET_CHECKBOX_MARK',
      payload: { breed, value },
    });
  };

  const checkAll: (checked: boolean) => void = (checked: boolean) => {
    let checkboxes = {};
    breeds.breedNames.forEach((breed: string) => {
      const key = breed.replace(/ /g, '-');

      checkboxes = {
        ...checkboxes,
        [key]: checked,
      };
    });

    dispatch({ type: 'SET_CHECKBOXES', payload: { checkboxes } });
  };

  const submit: (event: FormEvent<HTMLFormElement>) => void = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const checked: Array<string> = [];
    Object.keys(state.checkboxes).forEach(box => {
      if (state.checkboxes[box]) {
        checked.push(box);
      }
    });
    if (checked.length > 1) {
      setOptions(Number(state.questions.elementConfig.value), checked);
      history.push('/quiz/game');
    } else {
      dispatch({ type: 'SET_INVALID' });
    }
  };

  const toggleHide: () => void = () => {
    dispatch({ type: 'TOGGLE_HIDE' });
  };

  let breedCheckboxes: any;
  const checkBoxesClasses = ['control'];
  if (!state.showCheckboxes) {
    checkBoxesClasses.push('d-none');
  }

  if (breeds.loading) {
    breedCheckboxes = <Loading />;
  } else if (breeds.error) {
    breedCheckboxes = <ErrorMessage message={breeds.error} />;
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

export default QuizForm;
