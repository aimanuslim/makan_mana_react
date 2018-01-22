import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
	ADD_PLACES
} from './types';

export const addPlace = ({ name, rating, price_level, international_phone_number, opening_hours  })  => {
	return (dispatch) => {
		firebase.database().ref('/places')
		.push({ name, rating, price_level, international_phone_number, opening_hours  })
		.then(() => {
			dispatch({ type: ADD_PLACES });
		});
	}

}