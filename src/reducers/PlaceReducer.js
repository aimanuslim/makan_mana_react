import {
	PLACES_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	data: [],
	doneFetching: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PLACES_FETCH_SUCCESS:
			return { data: action.payload, doneFetching: true };
		default:
			return { ...state };
	}
};
