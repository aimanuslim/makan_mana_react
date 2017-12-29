import React,  { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import AutoSuggestInput from './AutoSuggestInput';
import { getSinglePlaceDetailsByName } from '../actions';

class PlaceAdd extends Component {
	render() {
		return (
			<View>
				<AutoSuggestInput
					onSelect={this.props.getSinglePlaceDetailsByName}
				/>
			</View>
			
			);
	}
} 


export const mapStateToProps = ({ googleAPI }) => {
	const { newPlace } = googleAPI;
	return { newPlace };
};

export default connect(mapStateToProps, { getSinglePlaceDetailsByName })(PlaceAdd);
