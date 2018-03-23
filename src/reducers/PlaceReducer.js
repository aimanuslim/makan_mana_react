import {
	PLACES_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	data: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PLACES_FETCH_SUCCESS:
			return { data: action.payload };
		default:
			return { ...state };
	}
};
