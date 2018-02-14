import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
	ADD_PLACES,
	FETCH_PLACES,
	SAVE_PLACE_SUCCESS
} from './types';

export const addPlace = ({ name, rating, international_phone_number, opening_hours  })  => {
	const { currentUser } = firebase.auth;


	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/places`)
		.push({ name, rating, international_phone_number, opening_hours})
		.then(() => {

			dispatch({ type: ADD_PLACES });
		});
	};

};

export const fetchPlaces = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/places`)
		.on('value', snapshot => {
			dispatch({ type: FETCH_PLACES, payload: snapshot.val() });
		});
	};
}

export const savePlaces = ({ name, rating, international_phone_number, opening_hours, uid }) => {
	const { currentUser } = firebase.auth();


	return (dispatch) => {
	firebase.database().ref(`/users/${currentUser.uid}/places/${uid}`)
		.set({ name, rating, international_phone_number, opening_hours })
		.then(() => {
			dispatch({ type: SAVE_PLACE_SUCCESS });			
		});
	};

};