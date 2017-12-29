import React, { Component } from 'react';
import { Text, TouchableOpacity, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';

import { CardSection } from './common/index';
import { findAutoComplete, clearAutoComplete, setCurrentQuery, findNearbyAreas } from '../actions';

class AutoSuggestionInput extends Component {

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
		const onSelectFunc = this.props.onSelect;
		onSelectFunc(item);
		Keyboard.dismiss();
	}

	render() {
		return (
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
};

const mapStateToProps = ({ googleAPI }) => {
	const { 
		autoCompleteList, 
		currentQuery, 
		newPlace
	} = googleAPI;
	return { autoCompleteList, currentQuery, newPlace };
};

export default connect(mapStateToProps, { findAutoComplete, clearAutoComplete, setCurrentQuery, findNearbyAreas })(AutoSuggestionInput)
