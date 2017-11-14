import React, { Component } from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import { CardSection} from './common'


class ListItem extends Component {
	render () {

		const { name } = this.props.place;
		return (
			<TouchableWithoutFeedback>
			  <View>
			    <CardSection>
			      <Text style={styles.placeTextStyle}>
			        {name}
			      </Text>
			    </CardSection>
			  </View>
			</TouchableWithoutFeedback>

			)
	}
}

const styles = {
	placeTextStyle: {
		fontSize: 18, 
		paddingLeft: 15
	}
};



export default ListItem;