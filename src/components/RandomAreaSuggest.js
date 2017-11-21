import React, { Component, PermissionsAndroid } from 'react';
import { View, TouchableOpacity, Text, Keyboard, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Permissions from 'react-native-permissions';

import { Card, CardSection, Button, Spinner } from './common/index';
import AreaList from './AreaList';
import { findAutoComplete, clearAutoComplete, setCurrentQuery, findVicinityFromGPS, findNearbyAreas } from '../actions';

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
			return (<Spinner />);
		}

		return (
				<AreaList style={{flex: 1}} />
			);
	}

	render() {
			return (
				
				<View style={{flex:1}}>
					<CardSection>
						<Autocomplete 
							style={styles.queryFontStyle}
							data={this.props.autoCompleteList}
							defaultValue={this.props.currentQuery}
							hideResults={!this.state.showSuggestions}
							onChangeText={this.onQueryChange.bind(this)}
						
						renderItem={item => (
							<TouchableOpacity 
								onPress={this.onAutoCompleteSelect.bind(this, item)}
							>
							<CardSection>
							<Text style={styles.autoSuggestFontStyle}>{item}</Text>
							</CardSection>
							</TouchableOpacity>

							)}
						/>

					</CardSection>
					<CardSection>
						<Button onPress={this.onDetectLocationPressed.bind(this)}>
							Detect My Location
						</Button>
					</CardSection>

					{this.onDetectionFailed()}

					<KeyboardAwareScrollView
						keyboardShouldPersistTaps='handled'
					>
						<ScrollView >
							{this.renderAreaList()}
						</ScrollView>
					</KeyboardAwareScrollView>

					<CardSection>
						<Button>
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
	} = googleAPI;
	return { autoCompleteList, autoCompLoading, findingSuggestion, queryEntered, currentQuery, detectLocationFailed };
};

export default connect(mapStateToProps, { 
	findAutoComplete, 
	clearAutoComplete, 
	setCurrentQuery, 
	findVicinityFromGPS, findNearbyAreas })(RandomAreaSuggest);
