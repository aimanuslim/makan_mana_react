import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchPlaces } from '../actions';
import _ from 'lodash';


import ListItem from './ListItem';

class AreaList extends React.PureComponent {
	componentWillMount(){
		
	}

	

	render() {
		let list  = this.props.places;
		if(this.props.data){
			list = this.props.data;
		}
		return (
			
			<FlatList
				data={list}
				extraData={list}
				renderItem={(place) => (
					<ListItem place={place.item} />
				)}
				keyExtractor={(place) => {
					return place.place_id;
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
		return { ...val, place_id: pid };
	});
	// if (this.props.data) {
	// 	places.concat(this.props.data);
	// }
	// console.log(places);	
	return { places };
};

export default connect(mapStateToProps, { fetchPlaces })(AreaList);
