import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import SelectMode from './components/SelectMode';
import RandomAreaSuggest from './components/RandomAreaSuggest'


const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root">
				<Scene 
					key="main" 
					component={SelectMode}
					title="Makan Mana?"
					initial
					>
				</Scene>
				<Scene 
					key="enterArea"
					component={RandomAreaSuggest}

					>
				</Scene>
			</Scene>
		</Router>

		);
};


export default RouterComponent;