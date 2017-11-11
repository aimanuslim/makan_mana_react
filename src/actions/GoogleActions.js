import React from 'react';
import fetch from 'cross-fetch';
import _ from 'lodash';
import { 
	FIND_AUTOCOMPLETE,
	FOUND_AUTOCOMPLETE,
	SELECTION_DONE
} from './types';
import { KEY } from '../key'


export const findAutoComplete = ({query}) => {
	return (dispatch) => {
		dispatch({ type: FIND_AUTOCOMPLETE });
		console.log('Query is ' + query);
		console.log('Url is ' + `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${KEY}`);
		fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${KEY}`, 
	
			{
			      method: 'get',
			      dataType: 'json',
			      headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json'
			      }
			  }
			).
		then(

			response => {
				const json_data = response.json()
				// console.log(response)
				// console.log(json)

				json_data.then((data) => {
				        console.log(data);
				        console.log(_.map(data.predictions, 'description'))
				        dispatch({type: FOUND_AUTOCOMPLETE, payload: _.map(data.predictions, 'description')})
				      });
				
			}).
		catch(
			() => { console.log("Error finding autocomplete suggestions")}
			)
	}

};

export const clearAutoComplete = () => {
	return {
		type: SELECTION_DONE
	};
};

