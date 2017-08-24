import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import navigation from './navigation';
import search from './search';

const rootReducer = combineReducers({
	navigation,
	search
	// todos,
	// visibilityFilter
});

export default rootReducer;