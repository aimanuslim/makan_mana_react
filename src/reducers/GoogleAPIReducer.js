import {
	FIND_AUTOCOMPLETE,
	FOUND_AUTOCOMPLETE,
	SELECTION_DONE
} from '../actions/types';

const INITIAL_STATE = {
	autoCompleteList: [],
	autoCompLoading: false 
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FIND_AUTOCOMPLETE:
			return { ...state, autoCompLoading: true };
		case FOUND_AUTOCOMPLETE:
			return { ...state, ...INITIAL_STATE, autoCompleteList: action.payload };
		case SELECTION_DONE:
			return INITIAL_STATE;
		default:
			return state;
	}
};
