import {
	FIND_AUTOCOMPLETE,
	POPULATE_AUTOCOMPLETE,
	SET_QUERY,
	CLEAR_AUTOCOMPLETE,
	SHOW_DETECT_ERROR,
	POPULATE_SUGGESTION_LIST,
	FIND_NEARBY_AREAS
} from '../actions/types';

const INITIAL_STATE = {
	autoCompleteList: [],
	autoCompLoading: false,
	findingSuggestion: false,
	suggestionsList: [],
	queryEntered: false,
	currentQuery: '',
	detectLocationFailed: false,
	newPlace: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FIND_AUTOCOMPLETE:
			return { ...state, autoCompLoading: true };
		case POPULATE_AUTOCOMPLETE:
			return { ...state, ...INITIAL_STATE, autoCompleteList: action.payload };
		case CLEAR_AUTOCOMPLETE:
			return { ...INITIAL_STATE };
		case SET_QUERY:
			return { ...INITIAL_STATE, queryEntered: true, currentQuery: action.payload.query };
		case SHOW_DETECT_ERROR:
			return { ...INITIAL_STATE, detectLocationFailed: true };
		case POPULATE_SUGGESTION_LIST:
			return { ...state, suggestionsList: action.payload, findingSuggestion: false };
		case FIND_NEARBY_AREAS:
			return { ...state, findingSuggestion: true };
		case FILL_PLACE_DATA:
			return {...state, findingSuggestion: false, newPlace: action.payload }
		default:
			return state;
	}
};
