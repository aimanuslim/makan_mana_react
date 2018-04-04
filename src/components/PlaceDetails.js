import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { placeUpdate } from '../actions';
import { CardSection, Input } from './common';

class PlaceDetails extends Component {
	state = {
		usePlaceProps: false
	}


	componentWillMount() {
    	_.each(this.props.place, (value, prop) => {
      		this.props.placeUpdate({ prop, value });
	    });
	    if(this.props.place){
	    	console.log("Use place props set to true")
	    	this.setState({usePlaceProps: true})

	    } else {
	    	this.setState({usePlaceProps: false})
	    } 
	}

	getOpeningHours(opening_hours) {
		const today = new Date();
		console.log("opening_hours")
		console.log(opening_hours)
		if (opening_hours && opening_hours !== "Unavailable") {
			const { weekday_text } = opening_hours;
		 	return weekday_text[today.getDay()];
		} else {
			return null;
		}
	}

	getStringForValue(value){
		if(!value){
			return "Unavailable";
		} 

		if(typeof value !== 'string'){
			return value.toString()
		}

		return value
	}

	render() {
		var x;
		var placeDetails;
		if(this.state.usePlaceProps == true){
			console.log("Setting place details to the place props")
			console.log(this.props.place)
			placeDetails = { ...this.props.place }
		} else {
			placeDetails = { ...this.props }
		}


		return (
		<View>
			<CardSection style={styles.sectionStyle}>
				<Input
					label="Name"
					value={this.getStringForValue(placeDetails.name)}
					onChangeText={value => { 
						this.setState({usePlaceProps: false})
						this.props.placeUpdate({ prop: 'name', value })}
					}
				/>
			</CardSection>
			<CardSection style={styles.sectionStyle}>
				<Input
					label="Rating"
					value={this.getStringForValue(placeDetails.rating)}
					onChangeText={value => { 
						this.setState({usePlaceProps: false})
						this.props.placeUpdate({ prop: 'rating', value })}
					}
				/>
			</CardSection>
			<CardSection style={styles.sectionStyle}>
				<Input
					label="Address"
					value={this.getStringForValue(placeDetails.formatted_address)}
					onChangeText={value => { 
						this.setState({usePlaceProps: false})
						this.props.placeUpdate({ prop: 'formatted_address', value })}
					}
					
				/>
			</CardSection>
			<CardSection style={styles.sectionStyle}>
				<Input
					label="International Phone Number"
					value={this.getStringForValue(placeDetails.international_phone_number)}
					onChangeText={value => { 
						this.setState({usePlaceProps: false})
						this.props.placeUpdate({ prop: 'international_phone_number', value })}
					}
				/>
			</CardSection>
			<CardSection style={styles.sectionStyle}>
				<Input
					label="Opening Hours"
					value={this.getOpeningHours(placeDetails.opening_hours)}
				/>
			</CardSection>
			<CardSection style={styles.sectionStyle}>
				<Input
					label="Website"
					value={this.getStringForValue(placeDetails.website)}
					onChangeText={value => { 
						this.setState({usePlaceProps: false})
						this.props.placeUpdate({ prop: 'website', value })}
					}
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
