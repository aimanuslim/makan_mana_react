import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ListItem extends Component {

	render() {
		const { name } = this.props.place.item;
		return (
			<TouchableWithoutFeedback 
				onPress={() => {
					Actions.viewPlaceDetails({ place: this.props.place });
				}}
			>
				<View>
					<CardSection>
						<Text style={styles.placeTextStyle}>
							{name}
						</Text>
					</CardSection>
				</View>
			</TouchableWithoutFeedback>
			);
	}
}

const styles = {
	placeTextStyle: {
		fontSize: 18, 
		paddingLeft: 15
	}
};

export default ListItem;
