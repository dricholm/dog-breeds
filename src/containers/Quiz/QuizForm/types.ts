export interface QuizFormState {
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

export const SET_CHECKBOXES = 'SET_CHECKBOXES';
export const SET_QUESTION_NUMBER = 'SET_QUESTION_NUMBER';
export const SET_CHECKBOX_MARK = 'SET_CHECKBOX_MARK';
export const SET_INVALID = 'SET_INVALID';
export const TOGGLE_HIDE = 'TOGGLE_HIDE';

interface SetCheckboxesAction {
  type: typeof SET_CHECKBOXES;
  payload: {
    checkboxes: { [name: string]: boolean };
  };
}

interface SetQuestionNumberAction {
  type: typeof SET_QUESTION_NUMBER;
  payload: {
    questionNumber: string;
  };
}

interface SetCheckboxMarkAction {
  type: typeof SET_CHECKBOX_MARK;
  payload: {
    breed: string;
    value: boolean;
  };
}

interface SetInvalidAction {
  type: typeof SET_INVALID;
}

interface ToggleHideAction {
  type: typeof TOGGLE_HIDE;
}

export type QuizFormActionTypes =
  | SetCheckboxesAction
  | SetQuestionNumberAction
  | SetCheckboxMarkAction
  | SetInvalidAction
  | ToggleHideAction;
