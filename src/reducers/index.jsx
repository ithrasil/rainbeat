import { combineReducers } from 'redux';

import queryReducer from './query-reducer.jsx';
import songsReducer from './songs-reducer.jsx';
import configState from './config-reducer.jsx';
import cardReducer from './card-reducer.jsx';
import streamReducer from './stream-reducer.jsx';

const reducers = {
  query: queryReducer,
  songs: songsReducer,
  config: configState,
  card: cardReducer,
  stream: streamReducer
};

const allReducers = combineReducers(reducers);

export default allReducers;