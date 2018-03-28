import {
	PLACE_UPDATE,
	ADD_PLACE,
	NOTIFY_DONE, 
} from '../actions/types';

const INITIAL_STATE = {
	name: '',
	rating: '',
	formatted_address: '',
	international_phone_number: '',
	opening_hours: [],
	website: '',
	isSuccess: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_PLACE:
			console.log("IN add place ")
			return { ...state, isSuccess: true };
		case PLACE_UPDATE:
			console.log("IN place update")
			return { ...state, [action.payload.prop]: action.payload.value, isSuccess: false };
		case NOTIFY_DONE:
			return { ...state, isSuccess: false };
		default:
			return { ...state, isSuccess: false };
	}

};