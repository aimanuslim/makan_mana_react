import { combineReducers } from 'redux';
import DummyReducer from './DummyReducer';
import GoogleAPIReducer from './GoogleAPIReducer';

export default combineReducers({
	dummy: DummyReducer,
	googleAPI: GoogleAPIReducer
});
