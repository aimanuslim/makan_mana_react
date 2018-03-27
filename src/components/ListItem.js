import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SwipeRow, Button, Icon, View } from 'native-base';
import { Card, CardSection } from './common';

class ListItem extends Component {

	onRowPress() {
		console.log("Pressed")
    	Actions.editPlaceDetails({ place: this.props.place, random: false });
  	}
	render() {
		const { name } = this.props.place;
		return (
			
				
				
						<View>
					<SwipeRow
					
					leftOpenValue={75}
					rightOpenValue={-75}
					left={
						<Button success onPress={() => alert('Add')}>
						<Icon active name="add" />
						</Button>
					}
					body={
							<TouchableWithoutFeedback 
							onPress={this.onRowPress.bind(this)}
						>
						<View style={{ flex: 1 }}>
							<Text style={styles.placeTextStyle}>{name}</Text>
						</View>

							</TouchableWithoutFeedback>
						
						
					}
					right={
						<Button danger onPress={() => alert('Trash')}>
						<Icon active name="trash" />
						</Button>
					}
					/>
					</View>
					
				
			
			);
	}
}

const styles = {
	placeTextStyle: {
		fontSize: 18, 
		paddingLeft: 15,
		textAlign: 'left'
	}
};

export default ListItem;
