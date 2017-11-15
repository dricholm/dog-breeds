import * as actionTypes from '../actions/actionTypes';

const initialState = {
  breeds: {},
  breedNames: [],
  error: null,
  game: {
    answer: null,
    answers: [],
    correct: 0,
    correctAnswer: '',
    image: null,
    wrong: 0
  },
  gameOptions: {
    selectedBreeds: [],
    questions: 0
  },
  loading: false
};

const getRandomAnswers = (selectedBreeds) => {
  const answerCount = Math.min(4, selectedBreeds.length);
  let answers = [];
  while (answers.length < answerCount) {
    const idx = Math.floor(Math.random() * selectedBreeds.length);
    if (answers.indexOf(selectedBreeds[idx]) === -1)
      answers.push(selectedBreeds[idx]);
  }
  return answers;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BREEDS:
      return {
        ...state,
        error: null,
        loading: true
      };

    case actionTypes.GET_BREEDS_SUCCESS:
      const breedNames = [];
      for (let breed in action.payload.breeds) {
        if (action.payload.breeds[breed].length === 0) {
          breedNames.push(breed);
        } else {
          breedNames.push(...action.payload.breeds[breed].map((sub) => sub + ' ' + breed));
        }
      };
      return {
        ...state,
        breeds: action.payload.breeds,
        breedNames: breedNames,
        error: null,
        loading: false
      };

    case actionTypes.GET_BREEDS_FAIL:
      return {
        ...state,
        error: action.payload.errorMessage,
        loading: false
      };

    case actionTypes.SET_OPTIONS:
      const answersSet = getRandomAnswers(state.gameOptions.selectedBreeds);
      return {
        ...state,
        game: {
          answered: null,
          answers: answersSet,
          correct: 0,
          correctAnswer: answersSet[Math.floor(Math.random() * answersSet.length)],
          image: 'test.jpg',
          wrong: 0
        },
        gameOptions: {
          questions: action.payload.questions,
          selectedBreeds: action.payload.selectedBreeds
        }
      };

    case actionTypes.NEXT_QUESTION:
      const answersNext = getRandomAnswers(state.gameOptions.selectedBreeds);
      return {
        ...state,
        game: {
          ...state.game,
          answered: null,
          answers: answersNext,
          correctAnswer: answersNext[Math.floor(Math.random() * answersNext.length)],
          image: 'test.jpg'
        }
      };

    case actionTypes.ANSWER:
      return {
        ...state,
        game: {
          ...state.game,
          answered: action.payload.answer,
          correct: action.payload.answer === state.game.correctAnswer ? state.game.correct + 1 : state.game.correct,
          wrong: action.payload.answer === state.game.correctAnswer ? state.game.wrong : state.game.wrong + 1,
        }
      };

    case actionTypes.RESTART:
      const answersRestart = getRandomAnswers(state.gameOptions.selectedBreeds);
      return {
        ...state,
        game: {
          ...state.game,
          answered: null,
          answers: answersRestart,
          correctAnswer: answersRestart[Math.floor(Math.random() * answersRestart.length)],
          correct: 0,
          wrong: 0
        }
      };

    default:
      return state;
  }
};

export default reducer;
