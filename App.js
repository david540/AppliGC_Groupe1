import React from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';

import MainActivity from './Activity/MainActivity';
import TestActivity from './Activity/TestActivity';
import AuthentificationActivity from './Activity/Authentification/AuthentificationActivity';
import Authentificated from './Activity/Authentification/Authentificated';
import AccountRequestActivity from './Activity/Authentification/AccountRequestActivity';
import CvaConnect from './Activity/Authentification/CvaConnect';
import CVAActivity from './Activity/CVA/CVAActivity';
import PartenariatsActivity from './Activity/Partenariats/PartenariatsActivity';
import GeolocalisationActivity from './Activity/Geolocalisation/GeolocalisationActivity';
import InfoActivity from './Activity/Informations/InfoActivity';
import BonplanActivity from './Activity/Bonplan/BonplanActivity';
import CovoitActivity from './Activity/Bonplan/Covoit/CovoitActivity';
import LogementActivity from './Activity/Bonplan/Logement/LogementActivity';
import FormulaireLogementActivity from './Activity/Bonplan/Logement/FormulaireLogementActivity';
import StageActivity from './Activity/Bonplan/Stage/StageActivity';
import MaterielActivity from './Activity/Bonplan/Materiel/MaterielActivity';
import CarteActivity from './Activity/CVA/CarteActivity';
import ActualitesActivity from './Activity/Actualites/ActualitesActivity';
import MesOffresActivity from './Activity/Bonplan/Logement/MesOffresActivity';
import FormulaireCovoitActivity from './Activity/Bonplan/Covoit/FormulaireCovoitActivity';

const App = StackNavigator({
    MainActivity: {screen: MainActivity},
    CvaConnect: {screen: CvaConnect},
    TestActivity: {screen: TestActivity},
    CVAActivity: {screen:CVAActivity},
    AuthentificationActivity: {screen:AuthentificationActivity},
    Authentificated: {screen:Authentificated},
    AccountRequestActivity: {screen:AccountRequestActivity},
    PartenariatsActivity: {screen:PartenariatsActivity},
    GeolocalisationActivity: {screen:GeolocalisationActivity},
    InfoActivity: {screen:InfoActivity},
    ActualitesActivity: {screen:ActualitesActivity},
    CarteActivity: {screen:CarteActivity},
    BonplanActivity: {screen:BonplanActivity},
    CovoitActivity: {screen:CovoitActivity},
    LogementActivity: {screen:LogementActivity},
    StageActivity: {screen:StageActivity},
    MaterielActivity: {screen:MaterielActivity},
    FormulaireLogementActivity: {screen:FormulaireLogementActivity},
    MesOffresActivity: {screen:MesOffresActivity},
    FormulaireCovoitActivity: {screen:FormulaireCovoitActivity},
    //MesTrajetsActivity: {screen:MesTrajetsActivity},
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
