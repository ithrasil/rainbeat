import { combineReducers } from 'redux';

import queryReducer from './query-reducer.jsx';

const reducers = {
  query: queryReducer
};

const allReducers = combineReducers(reducers);

export default allReducers;