import { combineReducers } from 'redux';

import queryReducer from './query-reducer.jsx';
import songsReducer from './songs-reducer.jsx';
import cardReducer from './card-reducer.jsx';

const reducers = {
  query: queryReducer,
  songs: songsReducer,
  card: cardReducer
};

const allReducers = combineReducers(reducers);

export default allReducers;