import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { placeUpdate } from '../actions';
import { CardSection, Input } from './common';

class PlaceDetails extends Component {

	componentWillMount() {
    _.each(this.props.place, (value, prop) => {
      this.props.placeUpdate({ prop, value });
	    });
	 }

	getOpeningHours(opening_hours) {
		const today = new Date();
		if (opening_hours) {
			const { weekday_text } = opening_hours;
		 	return weekday_text[today.getDay()];
		} else {
			return null;
		}
	}

	render() {
		var placeDetails = { ...this.props };
		var x;

		const place = this.props.place;
		const { opening_hours } = place;
		console.log("Before");
		console.log(this.props);
		
		for(x in placeDetails){
			placeDetails[x] = placeDetails[x] ? placeDetails[x] : 'Unavailable';
		}	
		console.log("After");
		console.log(this.props);

		console.log("placeDetails");
		console.log(placeDetails);



		return (
		<View>
			<CardSection style={styles.sectionStyle}>
				<Input
					label="Name"
					value={placeDetails.name}
					onChangeText={value => this.props.placeUpdate({ prop: 'name', value })}
				/>
			</CardSection>
			<CardSection style={styles.sectionStyle}>
				<Input
					label="Rating"
					value={placeDetails.rating.toString()}
					onChangeText={value => this.props.placeUpdate({ prop: 'rating', value })}
				/>
			</CardSection>
			<CardSection style={styles.sectionStyle}>
				<Input
					label="Address"
					value={placeDetails.formatted_address}
					onChangeText={value => this.props.placeUpdate({ prop: 'formatted_address', value })}
				/>
			</CardSection>
			<CardSection style={styles.sectionStyle}>
				<Input
					label="International Phone Number"
					value={placeDetails.international_phone_number}
					onChangeText={value => this.props.placeUpdate({ prop: 'international_phone_number', value })}
				/>
			</CardSection>
			<CardSection style={styles.sectionStyle}>
				<Input
					label="Opening Hours"
					value={'dummy'}
					onChangeText={value => this.props.placeUpdate({ prop: 'opening_hours', value })}
				/>
			</CardSection>
			<CardSection style={styles.sectionStyle}>
				<Input
					label="Website"
					value={placeDetails.website}
					onChangeText={value => this.props.placeUpdate({ prop: 'website', value })}
				/>
			</CardSection>

		</View>
		);
	}
}

const styles = {
	sectionStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	labelTextStyle: {
		fontSize: 16,
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 5,
		paddingRight: 5,
		fontWeight: 'bold',
		alignSelf: 'flex-start'
	},
	valueTextStyle: {
		fontSize: 20,
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 5,
		paddingRight: 5,
		alignSelf: 'flex-end',
		flexWrap: 'wrap'
	}

};

const mapStateToProps = (state) => {
  const { name, rating, formatted_address, international_phone_number, opening_hours, website } = state.placeDetails;
  return { name, rating, formatted_address, international_phone_number, opening_hours, website };
};

export default connect(mapStateToProps, { placeUpdate })(PlaceDetails);
