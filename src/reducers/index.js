import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { formReducer } from './comingsoon'

export const rootReducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  ComingSoonStore: formReducer,
})
