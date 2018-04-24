import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import SelectMode from './components/SelectMode';
import RandomAreaSuggest from './components/RandomAreaSuggest';
import PlaceDetails from './components/PlaceDetails';
import FavoriteScreen from './components/FavoriteScreen';
import PlaceAdd from './components/PlaceAdd';
import LoginForm from './components/LoginForm';
import PlaceSave from './components/PlaceSave';


const RouterComponent = () => {
	return (
		<Router getSceneStyle={() => ({ backgroundColor: '#7A6174' })}>
			<Scene key="root">

				<Scene 
					key="login" 
					component={LoginForm}
					title="Login"
					initial
				/>

				<Scene 
					key="main" 
					component={SelectMode}
					title="Makan Mana?"
				/>

				<Scene 
					key="enterArea"
					component={RandomAreaSuggest}

				/>

				<Scene 
					key="updatePlaceDetails"
					title="Edit Place"					
					component={PlaceDetails}
				/>


				<Scene 
					key="addPlace"
					title="New Place"
					component={PlaceAdd}
				/>

				<Scene 
					key="savePlace"
					title="Save This Place"
					component={PlaceSave}
				/>

				<Scene
					onRight={() => Actions.addPlace()}
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
