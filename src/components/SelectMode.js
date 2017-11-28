import React, {Component} from 'react';
import { View } from 'react-native';
import { Button, Card, CardSection } from './common';
import { Actions } from 'react-native-router-flux';


class SelectMode extends Component {
	render () {
		return (
		<View style={{flex:1, flexDirection: 'column', justifyContent: 'center'}}>
			<Card>
				<CardSection>
					<Button onPress={() => 
						{
							Actions.enterArea();
						}
					}>
						Enter Area
					</Button>
				</CardSection>
				<CardSection>
					<Button onPress={() => 
						{
							Actions.viewFavorites();
						}
					}>
						Select From Favourites
					</Button>
				</CardSection>
			</Card>
		</View>
		);

	}

}

export default SelectMode;