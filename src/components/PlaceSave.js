import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';


import PlaceDetails from './PlaceDetails';
import { CardSection, Button } from './common';
import { addPlace } from '../actions';

class PlaceSave extends Component {


	onSavePlace() {
		this.props.addPlace(this.props.place)
	}



	render() {
		return (
			<View style={{ flex: 1 }}>
				<PlaceDetails place={this.props.place} />
				<CardSection>
					<Button style={{ flex: 1 }} onPress={this.onSavePlace.bind(this)}>
						Save Place
					</Button>
				</CardSection>

			</View>

			);
	}

}



export default connect(null, { addPlace })(PlaceSave);
