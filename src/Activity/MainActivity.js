import React from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getPartenariats, partenairesAreLoaded } from './Partenariats/DataLoader';
import { StatusBar } from 'react-native';
import { getEvents } from './Actualites/EventLoader';
import { getAssosAndEvents, eventsAreLoaded } from './Actualites/AssoLoader'


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
            height: Dimensions.get('window').height - StatusBar.Height,
            loadisnotdone: !this.checkIfInfosAreLoaded()
        }
  	}

    checkIfInfosAreLoaded(){
      return eventsAreLoaded() && partenairesAreLoaded();
    }

    loadForPartenariatsAndEvents(){
      getPartenariats(() => {getAssosAndEvents(() => {this.setState({loadisnotdone: false})})});
    }

    ori_change = () => {
        this.setState({
          width: Dimensions.get('window').width, height: Dimensions.get('window').height - StatusBar.Height
        });
    }

    componentWillMount() {
      Dimensions.addEventListener("change", this.ori_change);
    }

    componentWillUnmount() {
      // Important to stop updating state after unmount
      Dimensions.removeEventListener("change", this.ori_change);
    }

    isConnected(){
        AsyncStorage.multiGet(['email', 'password', 'numCVA', 'nom', 'prenom', 'ecole']).then((data)=> {
            console.log("salut");
            let email = data[0][1];
            let password = data [1][1];
            if(email !== null && password !== null && data[2][1] !== null && data[3][1] !== null && data[4][1] !== null && data[5][1] !== null){
                console.log("oucou");
                this.props.navigation.navigate('Authentificated', {
                    num_cva: data[2][1],
                    nom: data[3][1],
                    prenom: data[4][1],
                    ecole: data[5][1],
                });
            }
            else{
                console.log("anasssss");
                goToScreen(this.state.navigation, "AuthentificationActivity");
            }
        });

    }

    componentDidMount(){
      if(!this.checkIfInfosAreLoaded())
        this.loadForPartenariatsAndEvents();
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
        this.state.loadisnotdone
        ? (
          <View style={{justifyContent: 'center', alignItems: 'center', height:this.state.height, width:this.state.width}}>
            <Text>Chargement des informations</Text>
            <Text>Vérifiez que vous êtes connecté à internet</Text>
            <ActivityIndicator/>
          </View>
        )
        : (
         	<View style={styles.main_container}>
        		<View style = {[styles.titleContainerBox, {width: this.state.width, height: this.state.height/10}]}>
        			<Text style={[styles.titleContainerText, {marginTop: this.state.height/50}]}>ACCUEIL</Text>
          	</View>

            <View style={[styles.rowContainer, {width:this.state.width, height:this.state.height*9/30}]}>
              <TouchableOpacity onPress={() => { goToScreen(navigation, "BonplanActivity")}}>
                <View style={[styles.categoryContainer,{width:this.state.width/2, height:this.state.height*9/30, backgroundColor:"#EEF5DB"}]}>
                          <Text style={{color:"grey"}}> BONS PLANS </Text>
                          <Text style={[{color:'#cccccc'}, styles.centered_text]}>Cherchez les bons plans autour de chez vous</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress= {() => {this.isConnected()}}>
                <View style={[styles.categoryContainer,{width:this.state.width/2, height:this.state.height*9/30, backgroundColor:"#C7EFCF"}]}>
                          <Text style={{color:"grey"}}> MON COMPTE </Text>
                          <Text style={[{color:'#cccccc'}, styles.centered_text]}>Connectez vous pour profiter au maximum de nos fonctionnalités !</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[styles.rowContainer, {width:this.state.width, height:this.state.height*9/30}]}>
              <TouchableOpacity onPress={() => { goToScreen(navigation, "ActualitesActivity")}}>
                <View style={[styles.categoryContainer,{width:this.state.width/2, height:this.state.height*9/30, backgroundColor:"#C7EFCF"}]}>
                          <Text style={{color:'grey', fontWeight:'100'}}> CALENDRIER COMMUN </Text>
                          <Text style={[{color:'#cccccc'}, styles.centered_text]}>Suivez les évènements autour de vous</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { goToScreen(navigation, "PartenariatsActivity")}}>
                <View style={[styles.categoryContainer,{width:this.state.width/2, height:this.state.height*9/30, backgroundColor:"#EEF5DB"}]}>
                          <Text style={{color:'grey'}}> PARTENAIRES CVA </Text>
                          <Text style={[{color:'#cccccc'}, styles.centered_text]}>Liste de nos partenaires organisée par catégories</Text>

                </View>
              </TouchableOpacity>

            </View>
         		<View style={[styles.rowContainer, {width:this.state.width, height:this.state.height*9/30}]}>
              <TouchableOpacity onPress={() => { goToScreen(navigation, "GeolocalisationActivity")}}>
                <View style={[styles.categoryContainer,{width:this.state.width/2, height:this.state.height*9/30, backgroundColor:"#EEF5DB"}]}>
                           <Text style={{color:'grey'}}> MAPS </Text>
                           <Text style={[{color:'#cccccc'}, styles.centered_text]}>Regardez nos partenaires autour de vous</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress= {() => {goToScreen(navigation, "InfoActivity")
                }}>
                <View style={[styles.categoryContainer,{width:this.state.width/2, height:this.state.height*9/30, backgroundColor:"#C7EFCF"}]}>
                          <Text style={{color:"grey"}}> Grand Cercle </Text>
                          <Text style={[{color:'#cccccc'}, styles.centered_text]}>plus d'informations</Text>
                </View>
              </TouchableOpacity>
          	</View>

      </View>
  )  );
	}
}

/*
 * On peut définir ici tous les styles que l'on utilise, pour plus de lisibilité
 */
export const styles = StyleSheet.create({
  main_container: {
      flex: 1,
      backgroundColor: '#FFFFFF'
  },
	centered_text: {
		alignSelf: 'stretch',
		textAlign: 'center',
	},
	titleContainerBox: {
	  flexDirection: 'row',
	  backgroundColor: '#333745',
	  justifyContent: 'center',
	  alignItems: 'center',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
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
  field: {
      height: 40,
      width: 200,
      borderColor: 'black',
      borderRadius: 2,
      backgroundColor:'white',
      marginHorizontal:15,
      marginTop : 10,
      marginBottom : 25
  },
	categoryContainer: {
	  justifyContent: 'center',
	  alignItems: 'center',
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#FFFFFF'
	},

});
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