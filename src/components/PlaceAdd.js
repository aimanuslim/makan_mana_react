import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';


import { CardSection, Spinner, Button } from './common/index'; 
import AutoSuggestInput from './AutoSuggestInput';
import { getSinglePlaceDetailsByName, addPlace } from '../actions';

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
		this.props.addPlace(this.props.newPlace);
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
				<CardSection style={styles.sectionStyle}>
					<Text style={styles.labelTextStyle}>Name</Text>
					<View style={{flex: 1}}>
					<Text style={styles.valueTextStyle}>{this.props.newPlace.name}</Text>
					</View>
				</CardSection>
				<CardSection style={styles.sectionStyle}>
					<Text style={styles.labelTextStyle}>Rating</Text>
					<View style={{flex: 1}}>
					<Text style={styles.valueTextStyle}>{this.props.newPlace.rating}</Text>
					</View>
				</CardSection>
				<CardSection style={styles.sectionStyle}>
					<Text style={styles.labelTextStyle}>Pricing</Text>
					<View style={{flex: 1}}>
					<Text style={styles.valueTextStyle}>{this.props.newPlace.price_level}</Text>
					</View>
				</CardSection>
				<CardSection style={styles.sectionStyle}>
					<Text style={styles.labelTextStyle}>Phone</Text>
					<View style={{flex: 1}}>
					<Text style={styles.valueTextStyle}>{this.props.newPlace.international_phone_number}</Text>
					</View>
				</CardSection>
				<CardSection style={styles.sectionStyle}>
					<Text style={styles.labelTextStyle}>Open Period</Text>
					<View style={{flex: 1}}>
					<Text style={styles.valueTextStyle}>{this.getOpeningHours(this.props.newPlace.opening_hours)}</Text>
					</View>
				</CardSection>
				<CardSection style={styles.sectionStyle}>
					<Text style={styles.labelTextStyle}>Website</Text>
					<View style={{flex: 1}}>
					<Text style={styles.valueTextStyle}>{this.props.newPlace.website}</Text>
					</View>
				</CardSection>
				<CardSection>
					<Button style={{ flex: 1 }} onPress={this.onAddPlace.bind(this)}
					>
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


export const mapStateToProps = ({ googleAPI }) => {
	const { newPlace, findingNewPlace, newPlaceFound } = googleAPI;
	return { newPlace, findingNewPlace, newPlaceFound };
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
	}

};

export default connect(mapStateToProps, { getSinglePlaceDetailsByName, addPlace })(PlaceAdd);
