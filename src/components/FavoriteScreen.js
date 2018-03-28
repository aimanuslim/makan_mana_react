import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';

import { Button, CardSection } from './common';
import AreaList from './AreaList';


function getRandomIndex(min, max) {
	return Math.floor(min + Math.random() * (max - min));
}


class FavoriteScreen extends Component {
	onChooseForMePressed(placesCount) {
		const randomIndex = getRandomIndex(0, placesCount);
		Actions.editPlaceDetails({ place: this.props.places[randomIndex], random: true });
	}

	render() {
		return (
			<View style={{ flex:1 }}>
			<KeyboardAwareScrollView
						keyboardShouldPersistTaps='handled'
			>
						<ScrollView>
							<AreaList style={{ flex: 1 }} />
						</ScrollView>
			</KeyboardAwareScrollView>
			<CardSection>
				<Button onPress={() => this.onChooseForMePressed(this.props.places.length)}>Choose for me</Button>		
			</CardSection>
			</View>
			);
	}
}


const mapStateToProps = ({ place }) => {
	const { data } = place;
	const places = _.map(data, (val, pid) => {
		return { ...val, place_id: pid };
	});
	return { places };
};

export default connect(mapStateToProps, {})(FavoriteScreen);
