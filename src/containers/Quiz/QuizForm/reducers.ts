import {
  QuizFormState,
  QuizFormActionTypes,
  SET_CHECKBOXES,
  SET_QUESTION_NUMBER,
  SET_CHECKBOX_MARK,
  SET_INVALID,
  TOGGLE_HIDE,
} from './types';

export const initialState: QuizFormState = {
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

export const quizFormReducer: (
  state: QuizFormState,
  action: QuizFormActionTypes
) => QuizFormState = (state, action) => {
  switch (action.type) {
    case SET_CHECKBOXES:
      return {
        ...state,
        checkboxes: action.payload.checkboxes,
      };

    case SET_QUESTION_NUMBER:
      return {
        ...state,
        questions: {
          ...state.questions,
          elementConfig: {
            ...state.questions.elementConfig,
            value: action.payload.questionNumber,
          },
          touched: true,
        },
      };

    case SET_CHECKBOX_MARK:
      return {
        ...state,
        checkboxes: {
          ...state.checkboxes,
          [action.payload.breed]: action.payload.value,
        },
      };

    case SET_INVALID:
      return {
        ...state,
        isValid: false,
      };

    case TOGGLE_HIDE:
      return {
        ...state,
        showCheckboxes: !state.showCheckboxes,
      };

    default:
      console.error('Invalid QuizFormAction type', action);
      return state;
  }
};
