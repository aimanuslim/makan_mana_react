import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Toast } from 'native-base';
import {
	ADD_PLACE,
	PLACES_FETCH_SUCCESS,
	SAVE_PLACE_SUCCESS,
	PLACE_UPDATE,
	NOTIFY_DONE,
} from './types';


export const placeUpdate = ({ prop, value }) => {
  return {
    type: PLACE_UPDATE,
    payload: { prop, value }
  };
};


export const addPlace = ({ name, formatted_address, rating, international_phone_number, opening_hours, website })  => {
	const { currentUser } = firebase.auth();


	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/places`)
		.push({ name, formatted_address, rating, international_phone_number, opening_hours, website })
		.then(() => {
			dispatch({ type: ADD_PLACE });
			Toast.show({
	          text: 'Place saved!',
	          position: 'bottom',
	          buttonText: 'Okay'
	        });
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

export const closeNotification = () => {
	return {
		type: NOTIFY_DONE
	}
};