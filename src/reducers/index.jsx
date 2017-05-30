import { combineReducers } from 'redux';

import queryReducer from './query-reducer.jsx';
import songsReducer from './songs-reducer.jsx';
import configState from './config-state.jsx';

const reducers = {
  query: queryReducer,
  songs: songsReducer,
  config: configState
  
};

const allReducers = combineReducers(reducers);

export default allReducers;