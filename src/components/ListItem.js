import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SwipeRow, Button, Icon, View } from 'native-base';
import { Card, CardSection } from './common';

class ListItem extends Component {

	render() {
		const { name } = this.props.place.item;
		return (
			<TouchableWithoutFeedback 
				onPress={() => {
					Actions.viewPlaceDetails({ place: this.props.place, random: false });
				}}
			>
				

					<SwipeRow
					leftOpenValue={75}
					rightOpenValue={-75}
					left={
						<Button success onPress={() => alert('Add')}>
						<Icon active name="add" />
						</Button>
					}
					body={
						<View>
							<Text style={styles.placeTextStyle}>{name}</Text>
						</View>
					}
					right={
						<Button danger onPress={() => alert('Trash')}>
						<Icon active name="trash" />
						</Button>
					}
					/>

				
			</TouchableWithoutFeedback>
			);
	}
}

const styles = {
	placeTextStyle: {
		fontSize: 18, 
		paddingLeft: 15,
		textAlign: 'center'
	}
};

export default ListItem;
