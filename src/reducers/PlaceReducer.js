import {
	ADD_PLACE,
	FETCH_PLACES

} from '../actions/types';

const INITIAL_STATE = {
	data: []

}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case: ADD_PLACE
			return INITIAL_STATE;
		default:
			return INITIAL_STATE;
	}

}