import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Form, Item, Input, Label } from 'native-base';

import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { placeUpdate } from '../actions';
import { CardSection } from './common';

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
			<KeyboardAwareScrollView
						keyboardShouldPersistTaps='handled'
			>
						<ScrollView>
		<Form>
			<Item stackedLabel>
				<Label>Name</Label>
				<Input
					value={this.getStringForValue(placeDetails.name)}
					onChangeText={value => { 
						this.setState({usePlaceProps: false})
						this.props.placeUpdate({ prop: 'name', value })}
					}
					/>
			</Item>
			<Item stackedLabel>
				<Label>Rating</Label>
				<Input
					value={this.getStringForValue(placeDetails.rating)}
					onChangeText={value => { 
						this.setState({usePlaceProps: false})
						this.props.placeUpdate({ prop: 'rating', value })}
					}
					/>
			</Item>
			<Item stackedLabel>
				<Label>Address</Label>
				<Input
					value={this.getStringForValue(placeDetails.formatted_address)}
					onChangeText={value => { 
						this.setState({usePlaceProps: false})
						this.props.placeUpdate({ prop: 'formatted_address', value })}
					}
					/>
			</Item>
			
			<Item stackedLabel>
				<Label>International Phone Number</Label>
				<Input 
					value={this.getStringForValue(placeDetails.international_phone_number)}
					onChangeText={value => { 
						this.setState({usePlaceProps: false})
						this.props.placeUpdate({ prop: 'international_phone_number', value })}
					}
				/>
			</Item>
			<Item stackedLabel>
				<Label>Website</Label>
				<Input
					value={this.getStringForValue(placeDetails.website)}
					onChangeText={value => { 
						this.setState({usePlaceProps: false})
						this.props.placeUpdate({ prop: 'website', value })}
					}
					/>
			</Item>

		</Form>
		</ScrollView>
		</KeyboardAwareScrollView>

		
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
