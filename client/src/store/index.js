import { createStore } from 'redux';
import rootReducer from '../reducer';


const store  = createStore(rootReducer);

store.subscribe(() => {
    console.log('Store changed', store.getState());
});

export default store;