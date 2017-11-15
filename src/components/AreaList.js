import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';


import ListItem from './ListItem';

class AreaList extends Component {

	componentWillMount() {
		this.createDataSource(this.props.suggestionsList);
	}

	createDataSource(places) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(places);
	}


	renderRow(place) {
		console.log('place is ' + place)
		return <ListItem place={place} />;
	}

	render() {
		return (
			<ListView
			enableEmptySections
			dataSource={this.dataSource}
			renderRow={this.renderRow}
			/>
			);
	}
}

const mapStateToProps = ({ googleAPI }) => {
	const { suggestionsList } = googleAPI;
	return { suggestionsList };
};

export default connect(mapStateToProps, {})(AreaList);
