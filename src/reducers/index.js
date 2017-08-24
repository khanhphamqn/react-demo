import { combineReducers } from 'redux';
import navigation from './navigation';
import search from './search';

const rootReducer = combineReducers({
	navigation,
	search
});

export default rootReducer;