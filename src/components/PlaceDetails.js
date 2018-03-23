import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { placeUpdate } from '../actions';
import { CardSection, Input } from './common';

class PlaceDetails extends Component {

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
		const place = this.props.place;
		const { opening_hours } = place;
		return (
		<View>
			<CardSection style={styles.sectionStyle}>
				<Input
					label="Name"
					value={this.props.name}
					onChangeText={value => this.props.placeUpdate({ prop: 'name', value })}
				/>
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
				<Text style={styles.labelTextStyle}>Open Period</Text>
				<View style={{flex: 1}}>
				<Text style={styles.valueTextStyle}>{this.getOpeningHours(opening_hours)}</Text>
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
  const { name } = state.placeDetails;

  return { name };
};

export default connect(mapStateToProps, { placeUpdate })(PlaceDetails);
