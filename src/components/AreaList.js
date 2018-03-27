import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchPlaces } from '../actions';
import _ from 'lodash';


import ListItem from './ListItem';

class AreaList extends React.PureComponent {
	componentWillMount(){
		this.props.fetchPlaces();
	}



	render() {
		return (
			<FlatList
				data={this.props.places}
				extraData={this.props.places}
				renderItem={(place) => (
					<ListItem place={place.item} />
				)}
				keyExtractor={(place) => {
					return place.pid;
					}
				}
			/>
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
