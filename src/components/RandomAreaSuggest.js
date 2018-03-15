import React, { Component, PermissionsAndroid } from 'react';
import { View, TouchableOpacity, Text, Keyboard, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Permissions from 'react-native-permissions';
import { Actions } from 'react-native-router-flux';

import { Card, CardSection, Button, Spinner } from './common/index';
import AreaList from './AreaList';
import AutoSuggestInput from './AutoSuggestInput';
import { findAutoComplete, clearAutoComplete, setCurrentQuery, findVicinityFromGPS, findNearbyAreas } from '../actions';

function getRandomIndex(min, max) {
	return Math.floor(min + Math.random() * (max - min));
}


class RandomAreaSuggest extends Component {
	state = { autoCompleteQuery: '', 
				showSuggestions: true }

	onQueryChange = (text) => {
		this.props.findAutoComplete({ query: text });
		this.setState({ 
			showSuggestions: true
			});
	}

	onAutoCompleteSelect = (item) => {
		this.setState({ 
		showSuggestions: false
		});
		this.props.clearAutoComplete();
		this.props.setCurrentQuery({ query: item });
		this.props.findNearbyAreas(item);
		Keyboard.dismiss();
	}

	onDetectLocationPressed = () => {
		this.props.findVicinityFromGPS();
	}

	onDetectionFailed() {
		if (this.props.detectLocationFailed) {
			return (<Text>Location detection failed </Text>);
		}
	}

	renderAreaList() {
		if (this.props.findingSuggestion) {
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
							<AreaList style={{flex: 1}} data={this.props.suggestionsList}/>
						</ScrollView>
					</KeyboardAwareScrollView>
			);
	}


	onChooseForMePressed(placesCount) {
		const randomIndex = getRandomIndex(0, placesCount);
		console.log(this.props.suggestionsList);
		console.log('index is ' + randomIndex);
		console.log(this.props.suggestionsList[randomIndex]);
		Actions.viewPlaceDetails({ place: this.props.suggestionsList[randomIndex], random: true });
	}

	render() {
			return (
				
				<View style={{flex:1}}>
					<AutoSuggestInput 
						onSelect={this.props.findNearbyAreas}
					/>
					<CardSection>
						<Button onPress={this.onDetectLocationPressed.bind(this)}>
							Detect My Location
						</Button>
					</CardSection>

					{this.onDetectionFailed()}

					{this.renderAreaList()}
					
					<CardSection>
						<Button onPress={() => this.onChooseForMePressed(this.props.suggestionsList.length)}>
							Choose For Me!
						</Button>
					</CardSection>
				</View>
				
				);
	}
}

const styles = {

	autoSuggestFontStyle: {
		fontWeight: 'bold',
		fontSize: 15,
		padding: 15
	},

	queryFontStyle: {
		fontSize: 20,
		padding: 20
	},

	bottomButtonStyle: {
		paddingTop: 15,
		flex: 1
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

const mapStateToProps = ({ googleAPI }) => {
	const { 
		autoCompleteList, 
		autoCompLoading, 
		findingSuggestion,
		queryEntered, 
		currentQuery, 
		detectLocationFailed, 
		suggestionsList,
	} = googleAPI;
	return { autoCompleteList, autoCompLoading, findingSuggestion, queryEntered, currentQuery, detectLocationFailed, suggestionsList };
};

export default connect(mapStateToProps, { 
	findAutoComplete, 
	clearAutoComplete, 
	setCurrentQuery, 
	findVicinityFromGPS, 
	findNearbyAreas })(RandomAreaSuggest);
