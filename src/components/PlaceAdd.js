import React, { Component } from 'react';
import { View, Text, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Toast } from 'native-base';


import { CardSection, Spinner, Button } from './common/index';
import PlaceDetails from './PlaceDetails'; 
import AutoSuggestInput from './AutoSuggestInput';
import { getSinglePlaceDetailsByName, addPlace, closeNotification } from '../actions';

class PlaceAdd extends Component {



	getOpeningHours(opening_hours) {
		const today = new Date();
		if (opening_hours) {
			const { weekday_text } = opening_hours;
			return weekday_text[today.getDay()];
		} else {
			return null;
		}
	}

	onAddPlace = () => {
		// console.warn(this.props.newPlace)
		var newPlaceEdited = { ...this.props.newPlace }
		var x;
		for (x in newPlaceEdited) {
			newPlaceEdited[x] = newPlaceEdited[x] ? newPlaceEdited[x] : 'Unavailable';
		}
		// TODO: need to fix the undefined issue
		this.props.addPlace(newPlaceEdited);
		
	}

	renderPlaceDetails() {
		if (!this.props.newPlaceFound && !this.props.findingNewPlace) {
			return (<View></View>);
		}

		if (this.props.findingNewPlace) {
				return (
					<View style={styles.spinnerContainerStyle}>
						<Spinner style={styles.spinnerStyle} />
					</View>
				);
		}
		return (
			<View>
				<PlaceDetails place={this.props.newPlace} />
				<CardSection>
					<Button style={{ flex: 1 }} onPress={this.onAddPlace.bind(this)}>
						Add Place
					</Button>
				</CardSection>
			</View>

			);
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<AutoSuggestInput
					onSelect={this.props.getSinglePlaceDetailsByName}
				/>
				{this.renderPlaceDetails()}
			</View>
			
			);
	}
} 


export const mapStateToProps = ({ googleAPI, placeDetails }) => {
	const { newPlace, findingNewPlace, newPlaceFound } = googleAPI;
	const { isSuccess } = placeDetails;
	console.log(isSuccess);
	return { newPlace, findingNewPlace, newPlaceFound, isSuccess };
};


const styles = {
	sectionStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	labelTextStyle: {
		fontSize: 12,
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 5,
		paddingRight: 5,
		fontWeight: 'bold',
		alignSelf: 'flex-start'
	},
	valueTextStyle: {
		fontSize: 15,
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 5,
		paddingRight: 5,
		alignSelf: 'flex-end',
		flexWrap: 'wrap'
	},

	spinnerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	spinnerContainerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	cardSectionStyle: {
		justifyContent: 'center'
	},
	textStyle: {
		flex: 1,
		fontSize: 18,
		textAlign: 'center',
		lineHeight: 40
	},
	containerStyle: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		position: 'relative',
		width: 15,
		justifyContent: 'center'
	}

};

export default connect(mapStateToProps, { getSinglePlaceDetailsByName, addPlace, closeNotification })(PlaceAdd);
