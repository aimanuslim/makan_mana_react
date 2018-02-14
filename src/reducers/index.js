import { combineReducers } from 'redux';
import DummyReducer from './DummyReducer';
import GoogleAPIReducer from './GoogleAPIReducer';
import AuthReducer from './AuthReducer'

export default combineReducers({
	dummy: DummyReducer,
	googleAPI: GoogleAPIReducer,
	auth: AuthReducer
});
