import { combineReducers } from 'redux';
import DummyReducer from './DummyReducer';
import GoogleAPIReducer from './GoogleAPIReducer';
import AuthReducer from './AuthReducer';
import PlaceReducer from './PlaceReducer';

export default combineReducers({
	dummy: DummyReducer,
	googleAPI: GoogleAPIReducer,
	auth: AuthReducer,
	place: PlaceReducer
});
