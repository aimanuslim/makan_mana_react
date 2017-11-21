import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import { CardSection } from './common';

class PlaceDetails extends Component {
	render() {
		const place = this.props.place.item;
		// console.warn(this.props.place)
		return (
		<View>
			<CardSection style={styles.sectionStyle}>
				<Text style={styles.labelTextStyle}>Name</Text>
				<View style={{flex: 1}}>
				<Text style={styles.valueTextStyle}>{place.name}</Text>
				</View>
			</CardSection>
			<CardSection style={styles.sectionStyle}>
				<Text style={styles.labelTextStyle}>Rating</Text>
				<View style={{flex: 1}}>
				<Text style={styles.valueTextStyle}>{place.rating}</Text>
				</View>
			</CardSection>
			<CardSection style={styles.sectionStyle}>
				<Text style={styles.labelTextStyle}>Pricing</Text>
				<View style={{flex: 1}}>
				<Text style={styles.valueTextStyle}>{place.price_level}</Text>
				</View>
			</CardSection>
			<CardSection style={styles.sectionStyle}>
				<Text style={styles.labelTextStyle}>Phone</Text>
				<View style={{flex: 1}}>
				<Text style={styles.valueTextStyle}>{place.international_phone_number}</Text>
				</View>
			</CardSection>
			<CardSection style={styles.sectionStyle}>
				<Text style={styles.labelTextStyle}>Website</Text>
				<View style={{flex: 1}}>
				<Text style={styles.valueTextStyle}>{place.website}</Text>
				</View>
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
		fontSize: 20,
		padding: 20,
		fontWeight: 'bold',
		alignSelf: 'flex-start'
	},
	valueTextStyle: {
		fontSize: 20,
		padding: 20,
		alignSelf: 'flex-end',
		flexWrap: 'wrap'
	}

}


export default PlaceDetails;