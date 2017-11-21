import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import SelectMode from './components/SelectMode';
import RandomAreaSuggest from './components/RandomAreaSuggest';
import PlaceDetails from './components/PlaceDetails';


const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root">
				<Scene 
					key="main" 
					component={SelectMode}
					title="Makan Mana?"
					initial
				/>

				<Scene 
					key="enterArea"
					component={RandomAreaSuggest}

				/>

				<Scene 
					key="viewPlaceDetails"
					title="Restaurant Details"
					component={PlaceDetails}
				/>
			</Scene>
		</Router>

		);
};


export default RouterComponent;
