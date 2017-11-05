import React, { Component } from 'react';
import  { View } from 'react-native';
import { Input, Card, CardSection, Button } from './common';
import AreaList from './AreaList';

class RandomAreaSuggest extends Component {
	render () {
			return (
				<View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
					<Card>
						<CardSection>
							<Input
								label="Area"
								placeholder="E.g Palestine"
							/>
						</CardSection>
						<CardSection>
							<Button>
								Detect My Location
							</Button>
						</CardSection>
						<AreaList>
						</AreaList>

						<CardSection style={{paddingTop: 15}}>
							<Button >
								Choose For Me!
							</Button>
						</CardSection>

					</Card>
				</View>
				)
	}
}

export default RandomAreaSuggest;