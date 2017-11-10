import  {
	FIND_AUTOCOMPLETE,
	FOUND_AUTOCOMPLETE
} from '../actions/types'

const INITIAL_STATE  = {
	autoCompleteList: [],
	autoCompLoading: false 
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case FIND_AUTOCOMPLETE:
			return {...state, autoCompLoading: true}
		case FOUND_AUTOCOMPLETE:
			return {...state, ...INITIAL_STATE, autoCompleteList: action.payload}
		default:
			return state;
	}
}