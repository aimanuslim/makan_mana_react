import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStore } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';
import Router from './Router'

class App extends Component {
	render () {
		const store = createStore(reducers);
		return (
			<Provider store={store}>
				<Router/>
			</Provider>

			);
	}
}

export default App;