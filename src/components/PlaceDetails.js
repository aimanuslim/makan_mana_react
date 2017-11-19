import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import { CardSection } from './common';

class PlaceDetails extends Component {
	render() {
		const place = this.props.place.item;
		console.warn(this.props.place)
		return (
		<View>
			<CardSection>
				<Text>{place.name}</Text>
			</CardSection>
			<CardSection>
				<Text>{place.rating}</Text>
			</CardSection>
			<CardSection>
				<Text>{place.price_level}</Text>
			</CardSection>
			<CardSection>
				<Text>{place.international_phone_number}</Text>
			</CardSection>
			<CardSection>
				<Text>{place.price_level}</Text>
			</CardSection>
			<CardSection>
				<Text>{place.website}</Text>
			</CardSection>

		</View>
		);
	}
}


export default PlaceDetails;