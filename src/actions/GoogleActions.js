import React from 'react';
import fetch from 'cross-fetch';
import _ from 'lodash';
import { 
	FIND_AUTOCOMPLETE,
	POPULATE_AUTOCOMPLETE,
	SET_QUERY, 
	CLEAR_AUTOCOMPLETE,
	SHOW_DETECT_ERROR,
	POPULATE_SUGGESTION_LIST,
	FIND_NEARBY_AREAS

} from './types';
import { KEY } from '../key';


export const findAutoComplete = ({ query }) => {
	return (dispatch) => {
		dispatch({ type: FIND_AUTOCOMPLETE });
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
				const json_data = response.json();
				// console.log(response)
				// console.log(json)

				json_data.then((data) => {
					// console.log(data);
					// console.log(_.map(data.predictions, 'description'));
					dispatch({ type: POPULATE_AUTOCOMPLETE, payload: _.map(data.predictions, 'description') });
				});
			})
		.catch(
			() => { console.log('Error finding autocomplete suggestion'); }
			);
	};

};


export const setCurrentQuery = ({query}) => {
	return {
		type: SET_QUERY,
		payload: { query: query }
	}
}

export const clearAutoComplete = () => {
	return {
		type: CLEAR_AUTOCOMPLETE
	};
};

export const findNearbyAreas = (areaName) => {
	return (dispatch) => {
		dispatch({
			type: FIND_NEARBY_AREAS
		})
		console.warn("query " + areaName)
		fetch(`'https://maps.googleapis.com/maps/api/place/textsearch/json?query=${areaName}&key=${KEY}`)
		.then(
			whichPlaceResponse => {
				const json_data = whichPlaceResponse.json();
				json_data.then(whichPlaceData => {
					const location = whichPlaceData.results[0].geometry.location;
					fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=500&type=restaurant&key=${KEY}`)
					.then(
						suggestionsListResponse => { 
							const json_data = suggestionsListResponse.json();
							json_data.then(suggestionListData => {
								dispatch({
									type: POPULATE_SUGGESTION_LIST,
									payload: _.pick(suggestionListData.results, [
											'geometry', 
											'name',
											'types',
											'vicinity'
										])
								});
							});
						}

						);
				});
			}
			)
	};
};

export const findVicinityFromGPS = () => {
	return (dispatch) => {
		try{
		navigator.geolocation.getCurrentPosition(
			(position) => {
				fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude},${position.coords.longitude}&radius=500&type=restaurant&key=${KEY}`)
				.then(

					response => {
						const json_data = response.json();
						json_data.then(data => {
							dispatch(
							{
								type: SET_QUERY,
								payload: { query: data.results[0].name }
							})
							dispatch({
								type: POPULATE_SUGGESTION_LIST,
								payload: data.results
							})
						}
						)
					}
					)
			},
				(error) => {
					dispatch({ type: SHOW_DETECT_ERROR });
					console.log(error);
				},
				{ enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
			);
		} catch (error) {
			console.log(error)
		}
	};
};
