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

function fetchAreaDetails(placeid) {
	return new Promise((resolve, reject) => {
		fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=${KEY}`)
		.then(
			placeDetailsResponse => {
				const json = placeDetailsResponse.json();
				json.then(placeDetailData => {
					console.log(placeDetailData.result)
					resolve(placeDetailData.result);
				});
			})
		.catch(error => {
			console.warn("Rejected in fetch area details");
			reject(error)
		});
	});
}

function getPlaceDetailsListFromName(dispatch, areaName) {
	fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURI(areaName)}&key=${KEY}`)
	.then(
		whichPlaceResponse => {
			const json_data = whichPlaceResponse.json();
			const location = json_data.then(whichPlaceData => {
				return whichPlaceData.results[0].geometry.location;
			});
			return location;
	})
	.then(
		locationData => {
		return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationData.lat},${locationData.lng}&radius=500&type=restaurant&key=${KEY}`);
	})
	.then(suggestionListResponse => {
		const json_data = suggestionListResponse.json();
		json_data.then(suggestionListData => {
			return suggestionListData.results;
		})
		.then(results => {
			const promises = results.map(placeInfo => {
				return fetchAreaDetails(placeInfo.place_id)
				.then(placeDetails => {
					const { name, rating, international_phone_number, geometry, opening_hours } = placeDetails;
					return { name, rating, international_phone_number, geometry, opening_hours };
				})
				.catch(e => console.warn("Rejected in getting promises"))
			});
			// Wait for all Promises to complete
			Promise.all(promises)
			.then(arrayOfPlaceDetails => {
				// Handle results
				dispatch({
					type: POPULATE_SUGGESTION_LIST,
					payload: arrayOfPlaceDetails
				});
			})
			.catch(e => {
				console.error(e);
			});	
		});
	})
	.catch(e => console.error(e));
}


export const findNearbyAreas = (areaName) => {
	return (dispatch) => {
		dispatch({
			type: FIND_NEARBY_AREAS
		});
		getPlaceDetailsListFromName(dispatch, areaName);
	};
};

function getPlaceDetailsListFromLocation(dispatch, location){
	fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=500&type=restaurant&key=${KEY}`)
	.then(suggestionListResponse => {
		const json_data = suggestionListResponse.json();
		json_data.then(suggestionListData => {
			return suggestionListData.results;
		})
		.then(results => {
			const promises = results.map(placeInfo => {
				return fetchAreaDetails(placeInfo.place_id)
				.then(placeDetails => {
					const { name, rating, international_phone_number, geometry, opening_hours } = placeDetails;
					return { name, rating, international_phone_number, geometry, opening_hours };
				})
				.catch(e => console.warn("Rejected in getting promises"))
			});
			// Wait for all Promises to complete
			Promise.all(promises)
			.then(arrayOfPlaceDetails => {
				// Handle results
				dispatch({
					type: POPULATE_SUGGESTION_LIST,
					payload: arrayOfPlaceDetails
				});
			})
			.catch(e => {
				console.error(e);
			});	
		});
	})
	.catch(e => console.error(e));
}

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
							getPlaceDetailsListFromLocation(dispatch, position);
						});
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
