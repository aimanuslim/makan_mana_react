import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { fetchPlaces } from '../actions';

import { Button, CardSection, Spinner } from './common';
import AreaList from './AreaList';


function getRandomIndex(min, max) {
	return Math.floor(min + Math.random() * (max - min));
}


class FavoriteScreen extends Component {
	onChooseForMePressed(placesCount) {
		const randomIndex = getRandomIndex(0, placesCount);
		Actions.updatePlaceDetails({ place: this.props.places[randomIndex], random: true });
	}

	componentWillMount(){
		this.props.fetchPlaces()
	}

	renderFavoritesList() {
		if(!this.props.doneFetching){
			return (
				<View style={styles.spinnerContainerStyle}>
					<Spinner style={styles.spinnerStyle} />
				</View>
				);
		}

		return (
			<KeyboardAwareScrollView
						keyboardShouldPersistTaps='handled'
			>
						<ScrollView>
							<AreaList style={{ flex: 1 }} />
						</ScrollView>
			</KeyboardAwareScrollView>

			)
	}

	render() {
		return (
			<View style={{ flex:1 }}>
			{this.renderFavoritesList()}
			<CardSection>
				<Button onPress={() => this.onChooseForMePressed(this.props.places.length)}>Choose for me</Button>		
			</CardSection>
			</View>
			);
	}
}


const mapStateToProps = ({ place }) => {
	const { data, doneFetching } = place;
	const places = _.map(data, (val, pid) => {
		return { ...val, place_id: pid };
	});
	return { places, doneFetching };
};


const styles = {
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
}

export default connect(mapStateToProps, { fetchPlaces })(FavoriteScreen);
