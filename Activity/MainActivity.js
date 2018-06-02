import React from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getPartenariats } from './Partenariats/DataLoader';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getEvents } from './Actualites/EventLoader';


/*
 * Classe principale de la page d'accueil
 */
export default class MainActivity extends React.Component {

 	 /*
 	  * Constructeur qui sert à la navigation entre les activités (faite dans App.js)
 	  */
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
      var navigation = this.state.navigation;
	  	return (
     	<View style={styles.main_container}>
    		<View style = {[styles.titleContainerBox, {width: this.state.width, height: this.state.height/10}]}>
    			<Text style={[styles.titleContainerText, {marginTop: this.state.height/50}]}>ACCUEIL</Text>
      	</View>
        <View style={[styles.rowContainer, {width:this.state.width, height:this.state.height*2/5}]}>
          <TouchableOpacity onPress={() => { goToScreen(navigation, "ActualitesActivity")}}>
            <View style={[styles.categoryContainer,{width:this.state.width/2, height:this.state.height*4/10, backgroundColor:"#fcfcfc"}]}>
                      <Text style={{color:'grey', fontWeight:'100'}}> CALENDRIER COMMUN </Text>
                      <Text style={[{color:'#cccccc'}, styles.centered_text]}>Suivez les évènements autour de vous</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress= {() => { goToScreen(navigation, "CVAActivity")}}>
            <View style={[styles.categoryContainer,{width:this.state.width/2, height:this.state.height*4/10, backgroundColor:"black"}]}>
                      <Text style={{color:"#cccccc"}}> CVA </Text>
                      <Text style={[{color:'grey'}, styles.centered_text]}>Grâce à la CVA, profitez de réductions pour nos évènements et chez nos partenaires</Text>
            </View>
          </TouchableOpacity>
        </View>
     		<View style={[styles.rowContainer, {width:this.state.width, height:this.state.height*2/5}]}>
          <TouchableOpacity onPress={() => { goToScreen(navigation, "GeolocalisationActivity")}}>
            <View style={[styles.categoryContainer,{width:this.state.width/2, height:this.state.height*4/10, backgroundColor:"#f7bd13"}]}>
                       <Text style={{color:'#868686'}}> MAPS </Text>
          	           <Text style={[{color:'#a3a3a3'}, styles.centered_text]}>Regardez nos partenaires autour de vous</Text>
        	  </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { goToScreen(navigation, "PartenariatsActivity")}}>
            <View style={[styles.categoryContainer,{width:this.state.width/2, height:this.state.height*4/10, backgroundColor:"#a8a8a8"}]}>
                      <Text style={{color:'#f7bd13'}}> PARTENAIRES CVA </Text>
                      <Text style={[{color:'#ecf0f1'}, styles.centered_text]}>Liste de nos partenaires organisée par catégories</Text>

            </View>
          </TouchableOpacity>
      	</View>

        <TouchableOpacity onPress={() => { goToScreen(navigation, "InfoActivity")}}>
      		<View style = {[styles.titleContainerBox, {width: this.state.width, height: this.state.height/10}]}>
      		    <Text style={styles.bottomContainerText}>+ d'infos</Text>
        	</View>
        </TouchableOpacity>
      </View>
    );
	}
}

/*
 * On peut définir ici tous les styles que l'on utilise, pour plus de lisibilité
 */
const styles = StyleSheet.create({
  main_container: {
      flex: 1,
      backgroundColor: '#ecf0f1'
  },
	centered_text: {
		alignSelf: 'stretch',
		textAlign: 'center',
	},
	titleContainerBox: {
	  flexDirection: 'row',
	  backgroundColor: '#0f0f0f',
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	titleContainerText: {
	  color: 'white',
	  fontSize: 24,
	  fontWeight: '300',
	  textAlign: 'center',
	},
	bottomContainerText: {
	  color: 'white',
	  fontSize: 14,
	  fontWeight: '300',
	  textAlign: 'center',
	},
	rowContainer: {
	  flexDirection: 'row',
	},
	categoryContainer: {
	  justifyContent: 'center',
	  alignItems: 'center',
	},
});
/*
 * Fonction utilisé par la classe de Navigation situé dans App.js
 onPress={() => { goToScreen(navigation, "ActualitesActivity")}}
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
