import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
	ADD_PLACES
} from './types';

export const addPlace = (place)  => {
	const { currentUser }  = firebase.auth();
	const {  }
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees`)
		.push({ })
	}

}