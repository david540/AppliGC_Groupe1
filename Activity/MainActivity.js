import React from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getPartenariats, partenairesAreLoaded } from './Partenariats/DataLoader';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getEvents } from './Actualites/EventLoader';
import { getAssosAndEvents, eventsAreLoaded } from './Actualites/AssoLoader';
import { getLogements, logementsAreLoaded } from './Bonplan/Logement/DataLoader'
import { styles } from './Styles'


/*
 * Classe principale de la page d'accueil
 */



export default class MainActivity extends React.Component {

 	 /*
 	  * Constructeur qui sert à la navigation entre les activités (faite dans App.js)
 	  */
  	constructor(props){
    		super(props);
    		this.state = {
            authentificationType: 1,
    		    navigation: props.navigation,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height - getStatusBarHeight(),
            loadisnotdone: !this.checkIfInfosAreLoaded()
        }
  	}

    checkIfInfosAreLoaded(){
      return eventsAreLoaded() && partenairesAreLoaded() && logementsAreLoaded();
    }

    loadInfos(){
      getPartenariats(() => {getAssosAndEvents(() => {getLogements(() => {this.setState({loadisnotdone: false})})})});
    }

    ori_change = () => {
        this.setState({
          width: Dimensions.get('window').width, height: Dimensions.get('window').height - getStatusBarHeight()
        });
    }

    componentWillMount() {
      Dimensions.addEventListener("change", this.ori_change);
    }

    componentWillUnmount() {
      // Important to stop updating state after unmount
      Dimensions.removeEventListener("change", this.ori_change);
    }

    componentDidMount(){
      if(!this.checkIfInfosAreLoaded())
        this.loadInfos();
    }
    _onLongPressBonplan(){
        Alert.alert("Accéder aux offres de logements, de covoiturage, de stages ou d'échange de matériel")
    }

    _onLongPressAuthentification(){
        Alert.alert("Se connecter afin de profiter pleinement de l'application")
    }

    _onLongPressCalendrier(){
        Alert.alert("Afficher le calendrier commun des écoles du groupe INPG")
    }

    _onLongPressPartenaires(){
        Alert.alert("Consulter la liste des partenaires CVA")
    }

    _onLongPressCarte(){
        Alert.alert("Regarder sur la carte où sont nos partenaires CVA")
    }

    _onLongPressInfos(){
        Alert.alert("Consulter plus d'informations")
    }
	/*
	 * C'est le retour de cette fonction qui gere l'affichage
	 * C'est une syntaxe de XML
	 */
	render() {
      var navigation = this.state.navigation;
	  	return (
        this.state.loadisnotdone
        ? (
          <View style={styles.loading_screen}>
            <Text>Chargement des informations</Text>
            <Text>Vérifiez que vous êtes connecté à internet</Text>
            <ActivityIndicator/>
          </View>
        )
        : (
         	<View style={styles.main_container}>
        		<View style = {styles.main_banner}>
        			<Text style={[styles.text_neutral, styles.titleContainerText]}> ACCUEIL </Text>
          	</View>

            <View style={styles.button_row}>
              <TouchableOpacity
                    onPress={() => { goToScreen(navigation, "BonplanActivity")}}
                    delayLongPress={180}
                    onLongPress={this._onLongPressBonplan}>
                <View style={[styles.main_button, {backgroundColor:"#8d188f"}]}>
                    <Image style={{alignSelf: 'center'}} source={require('./assets/bonplan.png')}/>     
                      <Text style={[styles.text_neutral, styles.bubbleTitleText]}>Bons plans</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                    onPress= {() => { goToScreen(navigation, "AuthentificationActivity")}}
                    delayLongPress={180}
                    onLongPress={this._onLongPressAuthentification}>
                <View style={[styles.main_button, {backgroundColor:"#f68712"}]}>
                      <Image style={{alignSelf: 'center'}} source={require('./assets/authentification.png')}/>     
                      <Text style={[styles.text_neutral, styles.bubbleTitleText]}>Authentification</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.button_row}>
              <TouchableOpacity 
                    onPress={() => { goToScreen(navigation, "ActualitesActivity")}}
                    delayLongPress={180}
                    onLongPress={this._onLongPressCalendrier}>
                <View style={[styles.main_button, {backgroundColor:"#bf202b"}]}>
                      <Image style={{alignSelf: 'center'}} source={require('./assets/calendriercommun.png')}/>     
                      <Text style={[styles.text_neutral, styles.bubbleTitleText]}>Calendrier commun</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                    onPress={() => { goToScreen(navigation, "PartenariatsActivity")}}
                    delayLongPress={180}
                    onLongPress={this._onLongPressPartenaires}>
                <View style={[styles.main_button, {backgroundColor:"#04a1e6"}]}>
                      <Image style={{alignSelf: 'center'}} source={require('./assets/partenaires.png')}/>     
                      <Text style={[styles.text_neutral, styles.bubbleTitleText]}> Partenaires CVA </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.button_row}>
              <TouchableOpacity 
                    onPress={() => { goToScreen(navigation, "GeolocalisationActivity")}}
                    delayLongPress={180}
                    onLongPress={this._onLongPressCarte}>
                <View style={[styles.main_button, {backgroundColor:"#2250aa"}]}>
                      <Image style={{alignSelf: 'center'}} source={require('./assets/maps.png')}/>     
                      <Text style={[styles.text_neutral, styles.bubbleTitleText]}>Carte</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                    onPress= {() => {goToScreen(navigation, "InfoActivity") }}
                    delayLongPress={180}
                    onLongPress={this._onLongPressInfos}>
                <View style={[styles.main_button, {backgroundColor:"#80cc28"}]}>
                      <Image style={{alignSelf: 'center'}} source={require('./assets/info.png')}/>     
                      <Text style={[styles.text_neutral, styles.bubbleTitleText]}>Informations</Text>
                </View>
              </TouchableOpacity>
          	</View>

      </View>
  )  );
	}
}

/*
 * Fonction utilisé par la classe de Navigation situé dans App.js
 onPress={() => { goToScreen(navigation, "ActualitesActivity")}}
 */
export function resetToScreen(navigation,screen,params=null){
	var options = { routeName: screen };

	if (params){
		options['params'] = params;
	}

	const resetAction = NavigationActions.reset({
	  index: 0,
	  actions: [
	    NavigationActions.navigate(options)
	  ]
	});

	navigation.dispatch(resetAction);
}
export function goToScreen(navigation,screen,params=null){
	var options = { routeName: screen };

	if (params){
		options['params'] = params;
	}
	const action = NavigationActions.navigate(options);

	navigation.dispatch(action);
}
