import { combineReducers } from 'redux';
import displayReducer from './display';
import dataReducer from './data';
import crawlReducer from './crawl';


const rootReducer = combineReducers({
    display: displayReducer,
    data: dataReducer,
    crawl: crawlReducer,
});

export default rootReducer;