import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
	ADD_PLACE,
	PLACES_FETCH_SUCCESS,
	SAVE_PLACE_SUCCESS
} from './types';

export const addPlace = ({ name, rating, international_phone_number, opening_hours  })  => {
	const { currentUser } = firebase.auth;


	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/places`)
		.push({ name, rating, international_phone_number, opening_hours})
		.then(() => {

			dispatch({ type: ADD_PLACE });
		});
	};

};

export const fetchPlaces = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/places`)
		.on('value', snapshot => {
			dispatch({ type: PLACES_FETCH_SUCCESS, payload: snapshot.val() });
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