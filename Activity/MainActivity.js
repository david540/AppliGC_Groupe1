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
			<Text style={{color:'white'}}>Page d'accueil</Text>
		</View>
        	<View style={{width:_width,height:_height*4/9, flexDirection: 'row'}}>
        		<View style={{width:_width/2,height:_height*4/9, backgroundColor: 'green'}} />
        		<View style={{width:_width/2,height:_height*4/9, backgroundColor: 'yellow'}} />
        		<View style={{width:_width/2,height:_height*4/9, position:'absolute', justifyContent: 'center'}}>
         			<Text style={[{color:'white'}, styles.centered_text]}>Le style du texte est blanc et centré</Text>
          		</View>
       		</View>
       		<View style={{width:_width,height:_height*4/9, flexDirection: 'row'}}>
          		<View style={{width:_width/2,height:_height*4/9, backgroundColor: 'blue'}} />
          		<View style={{width:_width/2,height:_height*4/9, backgroundColor: 'red'}} />
          		<View style={{width:_width/2,height:_height*4/9, position:'absolute', justifyContent: 'center', alignItems: 'center'}}>
           			<Button
              				onPress={() => { resetToScreen(navigation, "TestActivity")}}
              				title = "Click !"
              				backgroundColor = 'blue'
            			/>
            			<Text style={[{color:'white'}, styles.centered_text]}>Accès à l'autre activité</Text>
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
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
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
