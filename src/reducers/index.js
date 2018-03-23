import { combineReducers } from 'redux';
import DummyReducer from './DummyReducer';
import GoogleAPIReducer from './GoogleAPIReducer';
import AuthReducer from './AuthReducer';
import PlaceReducer from './PlaceReducer';
import PlaceDetailsReducer from './PlaceDetailsReducer';

export default combineReducers({
	dummy: DummyReducer,
	googleAPI: GoogleAPIReducer,
	auth: AuthReducer,
	place: PlaceReducer,
	placeDetails: PlaceDetailsReducer
});
