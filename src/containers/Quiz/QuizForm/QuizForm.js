import Input from '../../../components/Form/Input/Input';
import React, { Component } from 'react';

class QuizForm extends Component {

  state = {
    quizForm: {
      questions: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: '1-100',
          value: '20',
          required: true,
          min: '1',
          max: '100'
        },
        touched: false
      }
    }
  };

  inputChangedHandler = (event, inputId) => {
    this.setState({
      quizForm: {
        ...this.state.quizForm,
        questions: {
          ...this.state.quizForm[inputId],
          elementConfig: {
            ...this.state.quizForm[inputId].elementConfig,
            value: event.target.value
          },
          touched: true
        }
      }
    });
  }

  check = (event, breed) => {
    console.log(breed, event.target.checked);
  }

  render() {
    const breedCheckboxes = this.props.breedNames.map(breed => (
      <label className="checkbox is-capitalized" key={breed}>
        <label className="checkbox" defaultChecked>
          <input
            type="checkbox"
            onChange={(event) => this.check(event, breed)} />
            &nbsp;{breed}&emsp;
        </label>
      </label>
    ));

    return (
      <form onSubmit={this.props.onStart}>
        <div className="field columns">
          <div className="control column is-narrow">
            <label htmlFor="questions" className="label">Number of questions</label>
            <Input
              elementType={this.state.quizForm.questions.elementType}
              elementConfig={this.state.quizForm.questions.elementConfig}
              value={this.state.quizForm.questions.value}
              invalid={!this.state.quizForm.questions.valid}
              shouldValidate={this.state.quizForm.questions.validation}
              touched={this.state.quizForm.questions.touched}
              changed={(event) => this.inputChangedHandler(event, 'questions')} />
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
            <button className="button is-link" type="button">Select all</button>
          </div>
          <div className="control">
            <button className="button is-link" type="button">Select none</button>
          </div>
        </div>

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
