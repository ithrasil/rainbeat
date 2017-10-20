import { combineReducers } from 'redux';

import searchReducer from 'Reducers/search-reducer.js';
import cardReducer from 'Reducers/card-reducer.js';
import queueReducer from 'Reducers/queue-reducer.js';

const reducers = {
  search: searchReducer,
  card: cardReducer,
	queue: queueReducer
};

const allReducers = combineReducers(reducers);

export default allReducers;