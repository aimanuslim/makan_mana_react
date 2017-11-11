import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Card, CardSection, Button } from './common/index';
import AreaList from './AreaList';
import { findAutoComplete, clearAutoComplete} from '../actions';

class RandomAreaSuggest extends Component {
	state = { autoCompleteQuery: '', 
				showSuggestions: true }

	render() {
			return (
				<KeyboardAwareScrollView
					keyboardShouldPersistTaps='handled'
					
				>
				<View style={{ flexDirection: 'column', justifyContent: 'center' }}>
					<Card>
						<CardSection>
							<Autocomplete
								data={this.props.autoCompleteList}
								defaultValue={this.state.autoCompleteQuery}
								hideResults={!this.state.showSuggestions}
								onChangeText={(text) => {
									this.props.findAutoComplete({ query: text });
									this.setState({ 
										autoCompleteQuery: text,
										showSuggestions: true
										});
								}
							}
							renderItem={item => (
								<TouchableOpacity 
									onPress={() => {
										this.setState({ 
										autoCompleteQuery: item,
										showSuggestions: false
										});
										this.props.clearAutoComplete();
										Keyboard.dismiss();
									}
								}
								>
								<CardSection>
								<Text style={styles.autoSuggestFontStyle}>{item}</Text>
								</CardSection>
								</TouchableOpacity>

								)}
							/>

						</CardSection>
						<CardSection>
							<Button>
								Detect My Location
							</Button>
						</CardSection>
						<AreaList />

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
	}
};

const mapStateToProps = ({ googleAPI }) => {
	const { autoCompleteList, autoCompLoading } = googleAPI;
	return { autoCompleteList, autoCompLoading };
};

export default connect(mapStateToProps, { findAutoComplete, clearAutoComplete })(RandomAreaSuggest);
