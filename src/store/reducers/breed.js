import * as actionTypes from '../actions/actionTypes';

const initialState = {
  breeds: {
    'akita': [],
    'corgi': [
      'cardigan',
      'pembroke welsh'
    ],
    'shiba': [],
    'vizsla': [
      'short haired',
      'wire haired'
    ]
  },
  breedNames: [],
  game: {
    answered: false,
    answers: [],
    correct: 0,
    correctAnswer: '',
    image: null,
    wrong: 0
  },
  gameOptions: {
    selectedBreeds: [],
    questions: 0
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BREEDS:
      const breedNames = [];
      for (let breed in state.breeds) {
        if (state.breeds[breed].length === 0) {
          breedNames.push(breed);
        } else {
          breedNames.push(...state.breeds[breed].map((sub) => sub + ' ' + breed));
        }
      };
      return {
        ...state,
        breedNames: breedNames
      };

    case actionTypes.SET_OPTIONS:
      return {
        ...state,
        gameOptions: {
          questions: action.payload.questions,
          selectedBreeds: action.payload.selectedBreeds
        }
      };

    case actionTypes.NEXT_QUESTION:
      const answerCount = Math.min(4, state.gameOptions.selectedBreeds.length);
      let answers = [];
      while (answers.length < answerCount) {
        const idx = Math.floor(Math.random() * state.gameOptions.selectedBreeds.length);
        if (answers.indexOf(state.gameOptions.selectedBreeds[idx]) === -1)
          answers.push(state.gameOptions.selectedBreeds[idx]);
      }

      return {
        ...state,
        game: {
          ...state.game,
          answered: false,
          answers: answers,
          correctAnswer: answers[Math.floor(Math.random() * answers.length)],
          image: 'test.jpg'
        }
      };

    default:
      return state;
  }
};

export default reducer;
