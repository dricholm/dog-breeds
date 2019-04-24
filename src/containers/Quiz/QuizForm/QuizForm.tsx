import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';

import * as breedActions from '../../../store/breed/actions';
import * as quizActions from '../../../store/quiz/actions';
import Input from '../../../components/Form/Input/Input';
import ToggleHide from '../../../components/Ui/ToggleHide/ToggleHide';
import ErrorMessage from '../../../components/Ui/ErrorMessage/ErrorMessage';
import Loading from '../../../components/Ui/Loading/Loading';
import { BreedState } from '../../../store/breed/types';
import { AppState } from '../../../store';

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

class QuizForm extends Component<QuizFormProps, QuizFormState> {
  state: QuizFormState;

  constructor(props: QuizFormProps) {
    super(props);

    if (props.breeds.breedNames.length === 0) {
      props.getBreeds();
    }

    this.state = {
      checkboxes: this.initCheckboxes(props.breeds.breedNames),
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
  }

  UNSAFE_componentWillUpdate(nextProps: QuizFormProps) {
    if (
      Object.keys(this.state.checkboxes).length === 0 &&
      nextProps.breeds.breedNames.length > 0
    ) {
      this.setState({
        ...this.state,
        checkboxes: this.initCheckboxes(nextProps.breeds.breedNames),
      });
    }
  }

  inputChangedHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputId: any
  ) => {
    const elementType = this.state[inputId]
      ? this.state[inputId].elementType
      : 'checkbox';
    switch (elementType) {
      case 'input':
        this.setState({
          ...this.state,
          [inputId]: {
            ...this.state[inputId],
            elementConfig: {
              ...this.state[inputId].elementConfig,
              value: event.target.value,
            },
            elementType: elementType,
            touched: true,
          },
        });
        break;
      case 'checkbox':
        this.setState({
          ...this.state,
          checkboxes: {
            ...this.state.checkboxes,
            [inputId]: event.target.checked,
          },
        });
        break;
      default:
        break;
    }
  };

  checkAll = (checked: any) => {
    let checkboxes = {};
    this.props.breeds.breedNames.forEach((breed: string) => {
      const key = breed.replace(/ /g, '-');

      checkboxes = {
        ...checkboxes,
        [key]: checked,
      };
    });

    this.setState({
      ...this.state,
      checkboxes: checkboxes,
    });
  };

  initCheckboxes = (breedNames: Array<string>) => {
    const checkboxes = {};
    breedNames.forEach(breed => (checkboxes[breed.replace(/ /g, '-')] = true));
    return checkboxes;
  };

  submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.questions.elementConfig.value === '') {
      this.setState({
        ...this.state,
        isValid: false,
      });
      return;
    }

    const checked: Array<string> = [];
    Object.keys(this.state.checkboxes).forEach(box => {
      if (this.state.checkboxes[box]) {
        checked.push(box);
      }
    });
    if (checked.length > 1) {
      this.props.setOptions(this.state.questions.elementConfig.value, checked);
      this.props.history.push('/quiz/game');
    } else {
      this.setState({
        ...this.state,
        isValid: false,
      });
    }
  };

  toggleHide = () => {
    this.setState((prevState: QuizFormState) => ({
      ...prevState,
      showCheckboxes: !prevState.showCheckboxes,
    }));
  };

  render() {
    let breedCheckboxes: any;
    const checkBoxesClasses = ['control'];
    if (!this.state.showCheckboxes) {
      checkBoxesClasses.push('d-none');
    }

    if (this.props.breeds.loading) {
      breedCheckboxes = <Loading />;
    } else if (this.props.breeds.error) {
      breedCheckboxes = <ErrorMessage message={this.props.breeds.error} />;
    } else if (Object.keys(this.state.checkboxes).length > 0) {
      let initial: string;
      breedCheckboxes = this.props.breeds.breedNames.map((breed: string) => {
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
        return (
          <React.Fragment key={key}>
            {separator}
            <Input
              elementType="checkbox"
              elementConfig={{
                checked: this.state.checkboxes[key],
                onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                  this.inputChangedHandler(event, key),
              }}
              label={breed}
            />
          </React.Fragment>
        );
      });
    }

    const checkedCount = Object.keys(this.state.checkboxes).filter(val => {
      return this.state.checkboxes[val];
    });

    return (
      <form onSubmit={this.submit} action="#">
        <div className="field columns">
          <div className="control column is-narrow">
            <label htmlFor="questions" className="label">
              Number of questions
            </label>
            <Input
              elementType={this.state.questions.elementType}
              elementConfig={{
                ...this.state.questions.elementConfig,
                onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                  this.inputChangedHandler(event, 'questions'),
              }}
              touched={this.state.questions.touched}
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
              shown={this.state.showCheckboxes}
              click={this.toggleHide}
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
              onClick={() => this.checkAll(true)}
            >
              Select all
            </button>
          </div>
          <div className="control">
            <button
              className="button is-link"
              type="button"
              onClick={() => this.checkAll(false)}
            >
              Select none
            </button>
          </div>
        </div>

        {this.state.isValid ? null : (
          <p className="notification is-warning">
            Please choose at least two breeds
          </p>
        )}

        <div className="field">
          <div className="control has-text-centered">
            <button
              className="button is-medium is-link is-success"
              type="submit"
            >
              Start quiz
            </button>
          </div>
        </div>
      </form>
    );
  }
}

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
