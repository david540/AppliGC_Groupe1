import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Constants } from 'expo';

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
    		    navigation: props.navigation
    		}
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
    	var _height = Dimensions.get('window').height - Constants.statusBarHeight; //full screen height
	  	return (
     	<View style={styles.main_container}>
    		<View style = {[styles.container, {width: _width, height: _height/10, flexDirection: 'row', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}]}>
    			<Text style={{color:'white'}}>ACCUEIL</Text>
      	</View>
        <View style={{width:_width,height:_height*4/10, flexDirection: 'row'}}>
          <View style={[styles.container, {width:_width/2,height:_height*4/10, justifyContent: 'center', alignItems: 'center', backgroundColor: "#13E500", borderBottomWidth: 2, borderTopWidth: 4, borderRightWidth: 2, borderLeftWidth: 4}]}>
            <Button
              onPress={() => { resetToScreen(navigation, "ActualitesActivity")}}
              title = "Actualités"
              color = "#13E500"
            />
            <Text style={[{color:'white'}, styles.centered_text]}>Suivez les évènements autour de vous</Text>
          </View>
          <View style={[styles.container, {width:_width/2,height:_height*4/10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF004', borderBottomWidth: 2, borderTopWidth: 4, borderRightWidth: 2, borderLeftWidth: 4}]}>
            <Button
              onPress={() => { resetToScreen(navigation, "CVAActivity")}}
              title = "Accéder à votre CVA"
              color = "#FFF004"
            />
            <Text style={[{color:'white'}, styles.centered_text]}>Grâce à la CVA, profitez de réductions pour nos évènements et chez nos partenaires</Text>
          </View>
        </View>
     		<View style={{width:_width,height:_height*4/10, flexDirection: 'row'}}>
          <View style={[styles.container, {width:_width/2,height:_height*4/10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4848ee', borderBottomWidth: 2, borderTopWidth: 2, borderRightWidth: 2, borderLeftWidth: 4}]}>
         	  <Button
      				onPress={() => { resetToScreen(navigation, "GeolocalisationActivity")}}
      				title = "Maps"
              color = "#4848ee"
      			/>
          	<Text style={[{color:'white'}, styles.centered_text]}>Regardez nos partenaires autour de vous</Text>
        	</View>
          <View style={[styles.container, {width:_width/2,height:_height*4/10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF2020', borderBottomWidth: 2, borderTopWidth: 4, borderRightWidth: 4, borderLeftWidth: 2}]}>
            <Button
              onPress={() => { resetToScreen(navigation, "PartenariatsActivity")}}
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
      paddingTop: Constants.statusBarHeight,
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
