import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as breedActions from '../../../store/actions/breed';
import * as quizActions from '../../../store/actions/quiz';
import Input from '../../../components/Form/Input/Input';
import ToggleHide from '../../../components/Ui/ToggleHide/ToggleHide';
import ErrorMessage from '../../../components/Ui/ErrorMessage/ErrorMessage';
import Loading from '../../../components/Ui/Loading/Loading';

class QuizForm extends Component {

  constructor(props) {
    super();

    if (props.breeds.breedNames.length === 0) {
      props.getBreeds();
    }

    this.state = {
      questions: {
        elementConfig: {
          max: '100',
          min: '1',
          name: 'questions',
          placeholder: '1-100',
          required: true,
          type: 'number',
          value: '20'
        },
        elementType: 'input',
        touched: false
      },
      checkboxes: this.initCheckboxes(props.breeds.breedNames),
      isValid: true,
      showCheckboxes: false
    };
  }

  componentWillUpdate(nextProps) {
    if (Object.keys(this.state.checkboxes).length === 0 && nextProps.breeds.breedNames.length > 0) {
      this.setState({
        ...this.state,
        checkboxes: this.initCheckboxes(nextProps.breeds.breedNames)
      });
    }
  }

  inputChangedHandler = (event, inputId) => {
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
              value: event.target.value
            },
            elementType: elementType,
            touched: true
          }
        });
        break;
      case 'checkbox':
        this.setState({
          ...this.state,
          checkboxes: {
            ...this.state.checkboxes,
            [inputId]: event.target.checked
          }
        });
        break;
      default:
        break;
    }
  }

  checkAll = checked => {
    let checkboxes = {};
    this.props.breeds.breedNames.forEach(breed => {
      const key = breed.replace(/ /g, '-');

      checkboxes = {
        ...checkboxes,
        [key]: checked
      }
    });

    this.setState({
      ...this.state,
      checkboxes: checkboxes
    });
  }

  initCheckboxes = breedNames => {
    let checkboxes = {};
    breedNames.forEach(breed => {
      const key = breed.replace(/ /g, '-');

      checkboxes = {
        ...checkboxes,
        [key]: true
      }
    });
    return checkboxes;
  }

  submit = (event) => {
    event.preventDefault();
    if (this.state.questions.elementConfig.value === '') {
      this.setState({
        ...this.state,
        isValid: false
      });
      return;
    }

    let checked = [];
    Object.keys(this.state.checkboxes).forEach((box) => {
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
        isValid: false
      });
    }
  }

  toggleHide = () => {
    this.setState(prevState => ({
      ...prevState,
      showCheckboxes: !prevState.showCheckboxes
    }));
  }

  render() {
    let breedCheckboxes;
    const checkBoxesClasses= ['control'];
    if (!this.state.showCheckboxes) {
      checkBoxesClasses.push('d-none');
    }

    if (this.props.breeds.loading) {
      breedCheckboxes = <Loading />;
    } else if (this.props.breeds.error) {
      breedCheckboxes = <ErrorMessage message={this.props.breeds.error} />;
    } else if (Object.keys(this.state.checkboxes).length > 0) {
      let initial;
      breedCheckboxes = this.props.breeds.breedNames.map(breed => {
        let separator = null;
        if (initial !== breed.charAt(0)) {
          initial = breed.charAt(0);
          separator = (
            <React.Fragment>
              <p className="label is-capitalized">
                {initial}
              </p>
            </React.Fragment>
          )
        }
        const key = breed.replace(/ /g, '-');
        return (
          <React.Fragment key={key}>
            {separator}
            <Input
              changed={(event) => this.inputChangedHandler(event, key)}
              elementType='checkbox'
              elementConfig={{checked: this.state.checkboxes[key]}}
              label={breed} />
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
            <label htmlFor="questions" className="label">Number of questions</label>
            <Input
              changed={(event) => this.inputChangedHandler(event, 'questions')}
              elementType={this.state.questions.elementType}
              elementConfig={this.state.questions.elementConfig}
              touched={this.state.questions.touched} />
          </div>
        </div>

        <div className="level">
          <div className="level-left">
            <p className="label level-item">Select which breeds you want to test on ({checkedCount.length})</p>
            <ToggleHide className="level-item" shown={this.state.showCheckboxes} click={this.toggleHide} />
          </div>
        </div>
        <div className="field">
          <div className={checkBoxesClasses.join(' ')}>
            {breedCheckboxes}
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="button" onClick={() => this.checkAll(true)}>Select all</button>
          </div>
          <div className="control">
            <button className="button is-link" type="button" onClick={() => this.checkAll(false)}>Select none</button>
          </div>
        </div>

        {this.state.isValid ? null : <p className="notification is-warning">Please choose at least two breeds</p>}

        <div className="field">
          <div className="control has-text-centered">
            <button className="button is-medium is-link is-success" type="submit">Start quiz</button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  breeds: state.breeds
});

const mapDispatchToProps = dispatch => ({
  getBreeds: () => dispatch(breedActions.getBreeds()),
  setOptions: (questions, selectedBreeds) => dispatch(quizActions.setOptions(questions, selectedBreeds))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizForm);
