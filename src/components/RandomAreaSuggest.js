import React, { Component, PermissionsAndroid } from 'react';
import { View, TouchableOpacity, Text, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Permissions from 'react-native-permissions';

import { Card, CardSection, Button, Spinner } from './common/index';
import AreaList from './AreaList';
import { findAutoComplete, clearAutoComplete, setCurrentQuery, findVicinityFromGPS } from '../actions';

class RandomAreaSuggest extends Component {
	state = { autoCompleteQuery: '', 
				showSuggestions: true }

	onQueryChange = (text) => {
		this.props.findAutoComplete({ query: text });
		this.setState({ 
			showSuggestions: true
			});
	}

	onSuggestionSelect = (item) => {
		this.setState({ 
		showSuggestions: false
		});
		this.props.clearAutoComplete();
		this.props.setCurrentQuery({ query: item });
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
		if(this.props.findingSuggestion){
			return (<Spinner></Spinner>)
		}
		return <AreaList />;
	}

	render() {
			return (
				<KeyboardAwareScrollView
					keyboardShouldPersistTaps='handled'
					
				>
				<View style={{ flexDirection: 'column', justifyContent: 'center' }}>
					<Card>
						<CardSection>
							<Autocomplete 
								style={styles.queryFontStyle}
								data={this.props.autoCompleteList}
								defaultValue={this.props.currentQuery}
								hideResults={!this.state.showSuggestions}
								onChangeText={this.onQueryChange.bind(this)}
							
							renderItem={item => (
								<TouchableOpacity 
									onPress={this.onSuggestionSelect.bind(this, item)}
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

						{this.onDetectionFailed}

						{this.renderAreaList()}

						<CardSection style={{ paddingTop: 15 }}>
							<Button >
								Choose For Me!
							</Button>
						</CardSection>

					</Card>
				</View>
				</KeyboardAwareScrollView>
				
				);
	}
}

const styles = {
	autoSuggestFontStyle: {
		fontWeight: 'bold',
		fontSize: 15
	},

	queryFontStyle: {
		fontSize: 20
	}
};

const mapStateToProps = ({ googleAPI }) => {
	const { 
		autoCompleteList, 
		autoCompLoading, 
		queryEntered, 
		currentQuery, 
		detectLocationFailed 
	} = googleAPI;
	return { autoCompleteList, autoCompLoading, queryEntered, currentQuery, detectLocationFailed };
};

export default connect(mapStateToProps, { 
	findAutoComplete, 
	clearAutoComplete, 
	setCurrentQuery, 
	findVicinityFromGPS })(RandomAreaSuggest);
