import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Router from './Router'

class App extends Component {
	render () {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
		return (
			<Provider store={store}>
				<Router/>
			</Provider>

			);
	}
}

export default App;