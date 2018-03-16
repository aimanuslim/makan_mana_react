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
				extraData={this.props.places}
				renderItem={(place) => (
					<ListItem place={place} />
				)}
				keyExtractor={(place) => {
					return place.pid;
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
	// console.log(data);

	const places = _.map(data, (val, pid) => {
		return {...val, pid};
	});
	// console.log(places);	
	return { places };
};

export default connect(mapStateToProps, { fetchPlaces })(AreaList);
