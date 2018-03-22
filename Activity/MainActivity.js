import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getPartenariats } from './Partenariats/DataLoader';
import { getEvents } from './Actualites/EventLoader';
import { getStatusBarHeight } from 'react-native-status-bar-height';

/*
 * Classe principale de la page d'accueil
 */
export default class MainActivity extends React.Component {

 	 /*
 	  * Constructeur qui sert à la navigation entre les activités (faite dans App.js)
 	  */

    statusBarHeight = getStatusBarHeight();

  	constructor(props){
    		super(props);
        getPartenariats();
        getEvents();
    		this.state = {
    		    navigation: props.navigation,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        }
  	}

    ori_change = () => {
        this.setState({
          width: Dimensions.get('window').width, height: Dimensions.get('window').height
        });
    }

    componentWillMount() {
      Dimensions.addEventListener("change", this.ori_change);
    }

    componentWillUnmount() {
      // Important to stop updating state after unmount
      Dimensions.removeEventListener("change", this.ori_change);
    }

	/*
	 * Fonction appelé lorsque l'on clique sur le bouton
	 */
  	_onPressLearnMore(){
  		Alert.alert('TODO')
  	}
	/*
	 * C'est le retour de cette fonction qui gere l'affichage
	 * C'est une syntaxe de XML
	 */
	render() {
   		navigation = this.state.navigation;
    	var _width = Dimensions.get('window').width; //full screen width
    	var _height = Dimensions.get('window').height - this.statusBarHeight; //full screen height
	  	return (
     	<View style={styles.main_container}>
    		<View style = {[styles.container, {width: _width, height: _height/10, flexDirection: 'row', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}]}>
    			<Text style={{color:'white'}}>ACCUEIL</Text>
      	</View>
        <View style={{width:_width,height:_height*4/10, flexDirection: 'row'}}>
          <View style={[styles.container, {width:_width/2,height:_height*4/10, justifyContent: 'center', alignItems: 'center', backgroundColor: "#13E500", borderBottomWidth: 2, borderTopWidth: 4, borderRightWidth: 2, borderLeftWidth: 4}]}>
            <Button
              onPress={() => { goToScreen(navigation, "ActualitesActivity")}}
              title = "Actualités"
              color = "#13E500"
            />
            <Text style={[{color:'white'}, styles.centered_text]}>Suivez les évènements autour de vous</Text>
          </View>
          <View style={[styles.container, {width:_width/2,height:_height*4/10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF004', borderBottomWidth: 2, borderTopWidth: 4, borderRightWidth: 2, borderLeftWidth: 4}]}>
            <Button
              onPress={() => { goToScreen(navigation, "CVAActivity")}}
              title = "Accéder à votre CVA"
              color = "#FFF004"
            />
            <Text style={[{color:'white'}, styles.centered_text]}>Grâce à la CVA, profitez de réductions pour nos évènements et chez nos partenaires</Text>
          </View>
        </View>
     		<View style={{width:_width,height:_height*4/10, flexDirection: 'row'}}>
          <View style={[styles.container, {width:_width/2,height:_height*4/10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4848ee', borderBottomWidth: 2, borderTopWidth: 2, borderRightWidth: 2, borderLeftWidth: 4}]}>
         	  <Button
      				onPress={() => { goToScreen(navigation, "GeolocalisationActivity")}}
      				title = "Maps"
              color = "#4848ee"
      			/>
          	<Text style={[{color:'white'}, styles.centered_text]}>Regardez nos partenaires autour de vous</Text>
        	</View>
          <View style={[styles.container, {width:_width/2,height:_height*4/10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF2020', borderBottomWidth: 2, borderTopWidth: 4, borderRightWidth: 4, borderLeftWidth: 2}]}>
            <Button
              onPress={() => { goToScreen(navigation, "PartenariatsActivity")}}
              title = "Partenaires"
              color = "#FF2020"
            />
            <Text style={[{color:'white'}, styles.centered_text]}>Liste de nos partenaires organisée par catégories</Text>
          </View>
      	</View>
    		<View style = {{width: _width, height: _height/10, flexDirection: 'row', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}}>
    			<View style = {[styles.container, {width: _width/2, height: _height/10, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 4, borderTopWidth: 2, borderRightWidth: 2, borderLeftWidth: 4}]}>
            <Text style={[{color:'white'}, styles.centered_text]}>Billetterie</Text>
          </View>
    			<View style = {[styles.container, {width: _width/2, height: _height/10, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 4, borderTopWidth: 2, borderRightWidth: 4, borderLeftWidth: 2}]}>
            <Text style={[{color:'white'}, styles.centered_text]}>"+ d'infos"</Text>
			    </View>
      	</View>
      </View>
    );
	}
}

/*
 * On peut définir ici tout les styles que l'on utilise, pour plus de lisibilité
 */
const styles = StyleSheet.create({
  main_container: {
      flex: 1,
      backgroundColor: '#ecf0f1'
  },
  container: {
    borderColor: '#d6d7da',
  },
	centered_text: {
		alignSelf: 'stretch',
		textAlign: 'center',
	},
});

const colors = {
  colorActualites: '#13E500',
  colorCVA: '#FFF004',
  colorMaps: '#4848ee',
  colorPartenaires: '#FF2020',
}
/*
 * Fonction utilisé par la classe de Navigation situé dans App.js
 */
function resetToScreen(navigation,screen,params=null){
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
function goToScreen(navigation,screen,params=null){
	var options = { routeName: screen };

	if (params){
		options['params'] = params;
	}
	const action = NavigationActions.navigate(options);

	navigation.dispatch(action);
}
