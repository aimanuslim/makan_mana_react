import {
	PLACE_UPDATE,
	ADD_PLACE,

} from '../actions/types';

const INITIAL_STATE = {
	name: '',
	rating: '',
	formatted_address: '',
	international_phone_number: '',
	opening_hours: [],
	website: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_PLACE:
			return { ...state };
		case PLACE_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		default:
			return { ...state };
	}

};