import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

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
    	var _height = Dimensions.get('window').height; //full screen height
	  	return (
     	<View style={{width:_width,height:_height}}>
    		<View style = {{width: _width, height: _height/9, flexDirection: 'row', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}}>
    			<Text style={{color:'white'}}>Page d accueil</Text>
      		</View>
          <View style={{width:_width,height:_height*4/9, flexDirection: 'row'}}>
              <View style={[styles.container, {width:_width/2,height:_height*4/9, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', borderBottomWidth: 2, borderTopWidth: 4, borderRightWidth: 2, borderLeftWidth: 4}]}>
                <Button
                      onPress={() => { resetToScreen(navigation, "CVAActivity")}}
                      title = "Afficher la CVA"
                      color = "green"
                  />
                  <Text style={[{color:'white'}, styles.centered_text]}>Grâce à la CVA, profitez de réductions pour nos évènements et chez nos partenaires</Text>
              </View>
              <View style={[styles.container, {width:_width/2,height:_height*4/9, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFD036', borderBottomWidth: 2, borderTopWidth: 4, borderRightWidth: 4, borderLeftWidth: 2}]}>
                <Button
                      onPress={() => { resetToScreen(navigation, "PartenariatsActivity")}}
                      title = "Partenariats"
                      color = "#FFD036"
                  />
                  <Text style={[{color:'white'}, styles.centered_text]}>Liste de nos partenaires organisée par catégories</Text>
              </View>
          </View>
       		<View style={{width:_width,height:_height*4/9, flexDirection: 'row'}}>
              <View style={[styles.container, {width:_width/2,height:_height*4/9, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', borderBottomWidth: 4, borderTopWidth: 2, borderRightWidth: 2, borderLeftWidth: 4}]}>
           			<Button
              				onPress={() => { resetToScreen(navigation, "GeolocalisationActivity")}}
              				title = "Géolocalisation"
                      color = "blue"
            			/>
            			<Text style={[{color:'white'}, styles.centered_text]}>Regardez nos partenaires autour de vous</Text>
          		</View>
              <View style={[styles.container, {width:_width/2,height:_height*4/9, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', borderBottomWidth: 4, borderTopWidth: 2, borderRightWidth: 4, borderLeftWidth: 2}]}>
           			<Button
              				onPress={() => { resetToScreen(navigation, "BilletterieActivity")}}
              				title = "Billetterie"
                      color = "red"
            			/>
            			<Text style={[{color:'white'}, styles.centered_text]}>Achetez vos places pour un évènement ou tout autre chose</Text>
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
  container: {
    borderColor: '#d6d7da',
  },
	centered_text: {
		alignSelf: 'stretch',
		textAlign: 'center',
	},
});

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
