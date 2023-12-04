import { combineReducers } from 'redux';
import displayReducer from './display';

const rootReducer = combineReducers({
    display: displayReducer,
});

export default rootReducer;