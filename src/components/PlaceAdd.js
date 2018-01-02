import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';


import { CardSection, Spinner } from './common/index'; 
import AutoSuggestInput from './AutoSuggestInput';
import { getSinglePlaceDetailsByName } from '../actions';

class PlaceAdd extends Component {

	renderPlaceDetails() {
		if (!this.props.newPlaceFound) {
			return (<View></View>);
		}

		if (this.props.findingNewPlace) {
				return (
					<View style={styles.spinnerContainerStyle}>
						<Spinner style={styles.spinnerStyle} />
					</View>
				);
		}
		return (
			<View>
				<CardSection style={styles.sectionStyle}>
					<Text style={styles.labelTextStyle}>Name</Text>
					<View style={{ flex: 1 }}>
					<Text style={styles.valueTextStyle}>{this.props.newPlace.results[0].name}</Text>
					</View>	
				</CardSection>
				<CardSection style={styles.sectionStyle}>
					<Text style={styles.labelTextStyle}>Phone</Text>
					<View style={{ flex: 1 }}>
					<Text style={styles.valueTextStyle}>{this.props.newPlace.results[0].international_phone_number}</Text>
					</View>
				</CardSection>
			</View>

			);
	}

	render() {
		return (
			<View>
				<AutoSuggestInput
					onSelect={this.props.getSinglePlaceDetailsByName}
				/>

				{this.renderPlaceDetails()}

			</View>
			
			);
	}
} 


export const mapStateToProps = ({ googleAPI }) => {
	const { newPlace, findingNewPlace, newPlaceFound } = googleAPI;
	return { newPlace, findingNewPlace, newPlaceFound };
};

const styles = {
	sectionStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	labelTextStyle: {
		fontSize: 12,
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 5,
		paddingRight: 5,
		fontWeight: 'bold',
		alignSelf: 'flex-start'
	},
	valueTextStyle: {
		fontSize: 15,
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 5,
		paddingRight: 5,
		alignSelf: 'flex-end',
		flexWrap: 'wrap'
	},

	spinnerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	spinnerContainerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}

};

export default connect(mapStateToProps, { getSinglePlaceDetailsByName })(PlaceAdd);
