import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
	ADD_PLACE,
	PLACES_FETCH_SUCCESS,
	SAVE_PLACE_SUCCESS,
	PLACE_UPDATE 
} from './types';


export const placeUpdate = ({ prop, value }) => {
  return {
    type: PLACE_UPDATE,
    payload: { prop, value }
  };
};


export const addPlace = ({ name, formatted_address, rating, international_phone_number, opening_hours, website })  => {
	const { currentUser } = firebase.auth();

	if(!international_phone_number) {
		international_phone_number = "Unavailable";
	}

	if(!website) {
		website = "Unavailable";
	}


	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/places`)
		.push({ name, formatted_address, rating, international_phone_number, opening_hours, website })
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

export const savePlaces = ({ name, rating, international_phone_number, opening_hours, website, uid }) => {
	const { currentUser } = firebase.auth();


	return (dispatch) => {
	firebase.database().ref(`/users/${currentUser.uid}/places/${uid}`)
		.set({ name, rating, international_phone_number, opening_hour, website })
		.then(() => {
			dispatch({ type: SAVE_PLACE_SUCCESS });			
		});
	};

};