import { combineReducers } from 'redux';
import displayReducer from './display';
import dataReducer from './data';

const rootReducer = combineReducers({
    display: displayReducer,
    data: dataReducer
});

export default rootReducer;