import {combineReducers} from 'redux';

import searchReducer from 'Reducers/search-reducer.js';
import cardReducer from 'Reducers/card-reducer.js';
import queueReducer from 'Reducers/queue-reducer.js';
import filterReducer from 'Reducers/filter-reducer.js';

const reducers = {
    search: searchReducer,
    card: cardReducer,
    queue: queueReducer,
    filters: filterReducer
};

const allReducers = combineReducers(reducers);

export default allReducers;