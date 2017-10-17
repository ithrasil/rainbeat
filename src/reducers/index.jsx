import { combineReducers } from 'redux';

import queryReducer from 'Reducers/query-reducer.jsx';
import searchReducer from 'Reducers/search-reducer.jsx';
import cardReducer from 'Reducers/card-reducer.jsx';
import queueReducer from 'Reducers/queue-reducer.jsx';

const reducers = {
  query: queryReducer,
  search: searchReducer,
  card: cardReducer,
	queue: queueReducer
};

const allReducers = combineReducers(reducers);

export default allReducers;