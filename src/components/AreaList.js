import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { }


import ListItem from './ListItem';

class AreaList extends Component {
	
	render() {
		return (
			<View>
			<FlatList
				data={this.props.data}
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
	return { data };
};

export default connect(mapStateToProps, {  })(AreaList);
