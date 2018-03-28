import React, { Component } from 'react';
import { Root } from 'native-base';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
	componentWillMount() {
		const config = {
			apiKey: 'AIzaSyA8QkV_-aHUa9GtYD4SFkkizlT9UW-Vdf8',
			authDomain: 'makan-mana-ad26d.firebaseapp.com',
			databaseURL: 'https://makan-mana-ad26d.firebaseio.com',
			projectId: 'makan-mana-ad26d',
			storageBucket: 'makan-mana-ad26d.appspot.com',
			messagingSenderId: '250547534742'
		};

		firebase.initializeApp(config);
  }
	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
		return (
			<Root>
			<Provider store={store}>
				<Router />
			</Provider>
			</Root>
			);
	}
}

export default App;
