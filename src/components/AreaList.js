import React, {Component} from 'react';
import { ListView, Text} from 'react-native';
import ListItem  from './ListItem';
import { Card, CardSection} from './common';

class AreaList extends Component {

	renderRow(place) {
	    return <ListItem place={place} />;
	  }
	render () {
		return (
			<Card>
				<CardSection><Text>area 1</Text></CardSection>
				<CardSection><Text>area 2</Text></CardSection>
				<CardSection><Text>area 3</Text></CardSection>
				<CardSection><Text>area 4</Text></CardSection>
				<CardSection><Text>area 5</Text></CardSection>
			</Card>
			);
	};
};

export default AreaList