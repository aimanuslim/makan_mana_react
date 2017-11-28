import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';


import ListItem from './ListItem';

class AreaList extends Component {
	render() {
		return (
			<View>
			<FlatList
				data={this.props.suggestionsList}
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

const mapStateToProps = ({ googleAPI }) => {
	const { suggestionsList } = googleAPI;
	return { suggestionsList };
};

export default connect(mapStateToProps, {})(AreaList);
