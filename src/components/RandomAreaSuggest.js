import React, { Component } from 'react';
import  { View, TouchableOpacity, Text} from 'react-native';
import { connect } from 'react-redux';
import { Input, Card, CardSection, Button } from './common/index';
import AreaList from './AreaList';
import Autocomplete  from 'react-native-autocomplete-input';
import { findAutoComplete } from '../actions'

class RandomAreaSuggest extends Component {
	state = { autoCompleteQuery: '' }

	onQueryChange(text) {
		this.props.findAutoComplete(text)
	}

	render () {

			return (

				<View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
					<Card>
						<CardSection>

							<Autocomplete
								data={this.props.autoCompleteList}
								defaultValue={this.state.autoCompleteQuery}
							    onChangeText={(text) => {
							    	console.log("Before call" + text)
							    	this.props.findAutoComplete({ query: text })
							    	this.setState({autoCompleteQuery: text})
							    }
							    }
							    renderItem={item => (
							      <TouchableOpacity onPress={() => this.setState({ autoCompleteQuery: item })}>
							        <Text>{item}</Text>
							      </TouchableOpacity>
							      )}
							/>

						</CardSection>
						<CardSection>
							<Button>
								Detect My Location
							</Button>
						</CardSection>
						<AreaList>
						</AreaList>

						<CardSection style={{paddingTop: 15}}>
							<Button >
								Choose For Me!
							</Button>
						</CardSection>

					</Card>
				</View>

				
				)
	}
}

const mapStateToProps = ({ googleAPI }) => {
	const { autoCompleteList, autoCompLoading } = googleAPI
	return { autoCompleteList, autoCompLoading }
}

export default connect(mapStateToProps, {findAutoComplete})(RandomAreaSuggest);