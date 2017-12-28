import React,  { Component } from 'react';
import { connect } from 'react-redux';

class PlaceAdd extends Component {
	render() {
		<View>
			<CardSection>
				<Input 
					label="Name"
					placeholder="Rumah Anda"
					onChangeText={value => }
				/>

			</CardSection>
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
		</View>	
	}
} 

const styles = {
	queryFontStyle: {
		fontSize: 20,
		padding: 20
	},
}
