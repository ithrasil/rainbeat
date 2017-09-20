import { combineReducers } from 'redux';

import queryReducer from 'Reducers/query-reducer.jsx';
import songsReducer from 'Reducers/songs-reducer.jsx';
import cardReducer from 'Reducers/card-reducer.jsx';

const reducers = {
  query: queryReducer,
  songs: songsReducer,
  card: cardReducer
};

const allReducers = combineReducers(reducers);

export default allReducers;