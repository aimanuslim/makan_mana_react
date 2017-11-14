import {
	FIND_AUTOCOMPLETE,
	FOUND_AUTOCOMPLETE,
	SET_QUERY,
	CLEAR_AUTOCOMPLETE,
	AREA_DETECTED,
	DETECTION_ERROR
} from '../actions/types';

const INITIAL_STATE = {
	autoCompleteList: [],
	autoCompLoading: false,
	queryEntered: false,
	currentQuery: '',
	detectLocationFailed: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FIND_AUTOCOMPLETE:
			return { ...state, autoCompLoading: true };
		case FOUND_AUTOCOMPLETE:
			return { ...state, ...INITIAL_STATE, autoCompleteList: action.payload };
		case CLEAR_AUTOCOMPLETE:
			return { ...INITIAL_STATE };
		case SET_QUERY:
			return { ...INITIAL_STATE, queryEntered: true, currentQuery: action.payload };
		case AREA_DETECTED:
			return { ...state, queryEntered: true, currentQuery: action.payload.query };
		case DETECTION_ERROR:
			return { ...INITIAL_STATE, detectLocationFailed: true };
		default:
			return state;
	}
};
