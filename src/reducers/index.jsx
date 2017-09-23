import { combineReducers } from 'redux';

import queryReducer from 'Reducers/query-reducer.jsx';
import searchResultReducer from 'Reducers/searchResult-reducer.jsx';
import cardReducer from 'Reducers/card-reducer.jsx';

const reducers = {
  query: queryReducer,
  searchResult: searchResultReducer,
  card: cardReducer
};

const allReducers = combineReducers(reducers);

export default allReducers;