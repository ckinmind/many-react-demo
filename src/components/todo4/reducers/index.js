import { combineReducers } from 'redux';
import todos from './todoReducers';

const rootReducer = combineReducers({
    todos
});

export default rootReducer;
