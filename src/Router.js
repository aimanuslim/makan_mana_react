import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import SelectMode from './components/SelectMode';
import RandomAreaSuggest from './components/RandomAreaSuggest';
import PlaceDetails from './components/PlaceDetails';
import FavoriteScreen from './components/FavoriteScreen';


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
					title="Place Details"					
					component={PlaceDetails}
				/>

				<Scene
					onRight={() => Actions.createPlace()}
					rightTitle="Add"
					key="viewFavorites"
					title="Favorites"
					component={FavoriteScreen}	 
				/>
			</Scene>
		</Router>

		);
};


export default RouterComponent;
