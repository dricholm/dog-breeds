import Input from '../../../components/Form/Input/Input';
import React, { Component } from 'react';

class QuizForm extends Component {

  constructor(props) {
    super();

    const checkboxes = props.breedNames.length === 0
      ? {}
      : this.initCheckboxes(props.breedNames);
    this.state = {
      quizForm: {
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
        checkboxes: checkboxes,
        isValid: true
      }
    };
  }

  componentWillUpdate(nextProps) {
    if (Object.keys(this.state.quizForm.checkboxes).length === 0) {
      this.setState({
        ...this.state,
        quizForm: {
          ...this.state.quizForm,
          checkboxes: this.initCheckboxes(nextProps.breedNames)
        }
      });
    }
  }

  inputChangedHandler = (event, inputId) => {
    const elementType = this.state.quizForm[inputId]
      ? this.state.quizForm[inputId].elementType
      : 'checkbox';
    switch (elementType) {
      case 'input':
        this.setState({
          ...this.state,
          quizForm: {
            ...this.state.quizForm,
            [inputId]: {
              ...this.state.quizForm[inputId],
              elementConfig: {
                ...this.state.quizForm[inputId].elementConfig,
                value: event.target.value
              },
              elementType: elementType,
              touched: true
            }
          }
        });
        break;
      case 'checkbox':
        this.setState({
          ...this.state,
          quizForm: {
            ...this.state.quizForm,
            checkboxes: {
              ...this.state.quizForm.checkboxes,
              [inputId]: event.target.checked
            }
          }
        });
        break;
      default:
        break;
    }
  }

  checkAll = checked => {
    let checkboxes = {};
    this.props.breedNames.forEach(breed => {
      const key = breed.replace(/ /g, '-');

      checkboxes = {
        ...checkboxes,
        [key]: checked
      }
    });

    this.setState({
      ...this.state,
      quizForm: {
        ...this.state.quizForm,
        checkboxes: checkboxes
      }
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
    if (this.state.quizForm.questions.elementConfig.value === '') {
      this.setState({
        ...this.state,
        quizForm: {
          ...this.state.quizForm,
          isValid: false
        }
      });
      return;
    }

    let checked = 0;
    const valid = Object.keys(this.state.quizForm.checkboxes).find((box) => {
      if (this.state.quizForm.checkboxes[box]) checked++;
      return checked === 2 ? true : false;
    });
    if (valid) {
      this.props.onStart();
    } else {
      this.setState({
        ...this.state,
        quizForm: {
          ...this.state.quizForm,
          isValid: false
        }
      });
    }
  }

  render() {
    const breedCheckboxes = Object.keys(this.state.quizForm.checkboxes).length === 0
      ? <p>Loading...</p>
      : this.props.breedNames.map(breed => {
        const key = breed.replace(/ /g, '-');
        return (
          <Input
            changed={(event) => this.inputChangedHandler(event, key)}
            elementType='checkbox'
            elementConfig={{checked: this.state.quizForm.checkboxes[key]}}
            key={key}
            label={breed} />
        );
      });

    return (
      <form onSubmit={this.submit}>
        <div className="field columns">
          <div className="control column is-narrow">
            <label htmlFor="questions" className="label">Number of questions</label>
            <Input
              changed={(event) => this.inputChangedHandler(event, 'questions')}
              elementType={this.state.quizForm.questions.elementType}
              elementConfig={this.state.quizForm.questions.elementConfig}
              touched={this.state.quizForm.questions.touched} />
          </div>
        </div>

        <div className="field">
          <label className="label">Select which breeds you want to test on</label>
          <div className="control">
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

        {this.state.quizForm.isValid ? null : <p className="notification is-warning">Please choose at least two breeds</p>}

        <div className="field">
          <div className="control has-text-centered">
            <button className="button is-medium is-link is-success">Start quiz</button>
          </div>
        </div>
      </form>
    );
  }
}

export default QuizForm;
