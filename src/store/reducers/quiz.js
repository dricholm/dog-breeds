import * as actionTypes from '../actions/actionTypes';

const initialState = {
  choices: [],
  chosenAnswer: null,
  correct: 0,
  correctAnswer: null,
  errorMessage: null,
  image: null,
  loading: false,
  questionCount: 0,
  selectedBreeds: [],
  wrong: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_OPTIONS:
      return {
        ...state,
        correct: 0,
        errorMessage: null,
        image: null,
        loading: false,
        questionCount: action.payload.questionCount,
        selectedBreeds: action.payload.selectedBreeds,
        wrong: 0
      };

    case actionTypes.NEXT_QUESTION:
      return {
        ...state,
        choices: [],
        chosenAnswer: null,
        correctAnswer: null,
        errorMessage: null,
        image: null,
        loading: true
      };

    case actionTypes.NEXT_QUESTION_SUCCESS:
      return {
        ...state,
        choices: action.payload.choices.sort(),
        correctAnswer: action.payload.correctAnswer,
        errorMessage: null,
        image: action.payload.imageUrl,
        loading: false
      };

    case actionTypes.NEXT_QUESTION_FAIL:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        loading: false
      };

    case actionTypes.ANSWER:
      return {
        ...state,
        chosenAnswer: action.payload.answer,
        correct: action.payload.answer === state.correctAnswer ? state.correct + 1 : state.correct,
        wrong: action.payload.answer === state.correctAnswer ? state.wrong : state.wrong + 1,
      };

    case actionTypes.RESTART:
      return {
        ...state,
        choices: [],
        chosenAnswer: null,
        correctAnswer: null,
        correct: 0,
        wrong: 0
      };

    default:
      return state;
  }
};

export default reducer;
