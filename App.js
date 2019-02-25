import React from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';

import MainActivity from './Activity/MainActivity';
import TestActivity from './Activity/TestActivity';
import AuthentificationActivity from './Activity/Authentification/AuthentificationActivity';
import Authentificated from './Activity/Authentification/Authentificated';
import NewAuthentificationActivity from './Activity/Authentification/NewAuthentificationActivity';
import CVAActivity from './Activity/CVA/CVAActivity';
import PartenariatsActivity from './Activity/Partenariats/PartenariatsActivity';
import GeolocalisationActivity from './Activity/Geolocalisation/GeolocalisationActivity';
import InfoActivity from './Activity/Informations/InfoActivity';
import CarteActivity from './Activity/CVA/CarteActivity';
import ActualitesActivity from './Activity/Actualites/ActualitesActivity';

const App = StackNavigator({
    MainActivity: {screen: MainActivity},
		TestActivity: {screen: TestActivity},
    CVAActivity: {screen:CVAActivity},
    AuthentificationActivity: {screen:AuthentificationActivity},
    Authentificated: {screen:Authentificated},
    NewAuthentificationActivity: {screen:NewAuthentificationActivity},
    PartenariatsActivity: {screen:PartenariatsActivity},
    GeolocalisationActivity: {screen:GeolocalisationActivity},
    InfoActivity: {screen:InfoActivity},
    ActualitesActivity: {screen:ActualitesActivity},
    CarteActivity: {screen:CarteActivity}
},
{
    initialRouteName: 'MainActivity',
    headerMode: 'none'
});

const navigateOnce = (getStateForAction) => (action, state) => {
  const {type, routeName} = action;
  return (
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
  ) ? null : getStateForAction(action, state);
};

App.router.getStateForAction = navigateOnce(App.router.getStateForAction);

export default App;
