import React from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';

import MainActivity from './Activity/MainActivity';
import TestActivity from './Activity/TestActivity';
import CVAActivity from './Activity/CVA/CVAActivity';
import PartenariatsActivity from './Activity/Partenariats/PartenariatsActivity';
import GeolocalisationActivity from './Activity/Geolocalisation/GeolocalisationActivity';
import BilletterieActivity from './Activity/Billetterie/BilletterieActivity';
import ActualitesActivity from './Activity/Actualites/ActualitesActivity';

const App = StackNavigator({
    MainActivity: {screen: MainActivity},
		TestActivity: {screen: TestActivity},
    CVAActivity: {screen:CVAActivity},
    PartenariatsActivity: {screen:PartenariatsActivity},
    GeolocalisationActivity: {screen:GeolocalisationActivity},
    BilletterieActivity: {screen:BilletterieActivity},
    ActualitesActivity: {screen:ActualitesActivity}
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
