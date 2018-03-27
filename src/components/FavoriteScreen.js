import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button, CardSection } from './common';
import AreaList from './AreaList';

class FavoriteScreen extends Component {
	render() {
		return (
			<View style={{ flex:1 }}>
			<KeyboardAwareScrollView
						keyboardShouldPersistTaps='handled'
			>
						<ScrollView>
							<AreaList style={{ flex: 1 }} />
						</ScrollView>
			</KeyboardAwareScrollView>
			<CardSection>
				<Button>Choose for me</Button>		
			</CardSection>
			</View>
			);
	}
}


export default FavoriteScreen;
