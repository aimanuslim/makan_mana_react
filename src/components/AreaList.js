import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchPlaces } from '../actions';
import _ from 'lodash';


import ListItem from './ListItem';

class AreaList extends Component {
	componentWillMount(){
		this.props.fetchPlaces();
	}


	
	render() {
		return (
			<View>
			<FlatList
				data={this.props.places}
				renderItem={(place) => (
					<ListItem place={place} />
				)}
				keyExtractor={(place) => {
					return place.place_id;
					}
				}
			/>
			</View>
			);
	}
}

const mapStateToProps = ({ place }) => {
	const { data } = place;
	// console.warn(data)
	// console.warn(place)
	console.log(data);

	const places = _.map(data, (val, uid) => {
		return {...val, uid};
	});
	console.log(places);	
	return { places };
};

export default connect(mapStateToProps, { fetchPlaces })(AreaList);
