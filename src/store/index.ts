import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { breedReducer } from './breed/reducers';
import { quizReducer } from './quiz/reducers';

const rootReducer = combineReducers({
  breeds: breedReducer,
  quiz: quizReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = () => {
  const composeEnhancers =
    process.env.NODE_ENV === 'development'
      ? (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose)
      : compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

export default configureStore;
