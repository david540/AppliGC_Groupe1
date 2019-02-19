import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert, ScrollView, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';

/*
 * Exemple de 2ème activité
 */
export default class CVAActivity extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        navigation: props.navigation,
        username: '',
        password: '',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - getStatusBarHeight(),
        newAccount: false,
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

  _nbCharLim = 10;
  _authFailed = () => { Alert.alert("Echec", "Nom de compte ou mot de passe incorrect");
                        this.setState({newAccount: true});};

	_onPressLearnMore(){
		Alert.alert('TODO')
	}
  _validCharOrNum(lettre){
    return lettre.length === 1 && (lettre.match(/[a-z]/i) || lettre.match(/[0-9]/));
  }
  _validNum(lettre){
    return lettre.length === 1 && lettre.match(/[0-9]/);
  }

  _setInfos(responseJson){
    var infos = responseJson.split("&&&");
    if(infos[0] && infos[1] && infos[2] && infos[3] && infos[4]){
      if(infos[5]){
        try {
          AsyncStorage.setItem('code', infos[5]).then(Alert.alert("Ce téléphone est maintenant lié\n à votre compte CVA"));
        } catch (error) {
          Alert.alert("Erreur, veuillez contacter Gean Claude\n pour lui signaler l'erreur numéro 661, merci :)")
        }
      }
      this._goToCarte(infos[0], infos[1], infos[2], infos[3], infos[4]);
    }
    else if(infos[0] && infos[1]){
      Alert.alert("Veuillez attendre avant de lier\n un nouveau téléphone sur ce compte CVA");
      this.setState({newAccount:true});
    }
    else{
      this._authFailed();
    }
  }

  _goToCarte(num_cva, nom, prenom, ecole, username){
    this.props.navigation.navigate('CarteActivity', {
                num_cva: num_cva,
                nom: nom,
                prenom: prenom,
                ecole: ecole,
                username: username,
              });
  }
  _connexion_automatique(_code){
    AsyncStorage.getItem('username').then((username) => {this.state.username = username;
    AsyncStorage.getItem('password').then((password) => {this.state.password = password;
    //Alert.alert(password);
    if(username != '' && password != ''){
      this._connexion(_code)
    }else{
      this.setState({newAccount: true});
    }
  });});
  }
  _connexion = (_code) =>{
    fetch('http://inprod.grandcercle.org/appli/logincva.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        code: _code,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        this._setInfos(responseJson);
      }).catch((error) => {
        console.error(error);
      });
  }

  _onPressSubmit = () => {
    if(this.state.username.length > this._nbCharLim || this.state.password > this._nbCharLim){
      this._authFailed();
      return;
    }
    for(var i=0; i < this.state.username.length; i++){
      if( ! this._validCharOrNum(this.state.username.charAt(i)) ){
        this._authFailed();
        return;
      }
    }
    for(var i=0; i < this.state.password.length; i++){
      if( ! this._validCharOrNum(this.state.password.charAt(i))) {
        this._authFailed();
        return;
      }
    }
    var code = 0;
    try {
      AsyncStorage.setItem('username', this.state.username);
      AsyncStorage.setItem('password', this.state.password);
      AsyncStorage.getItem('code').then((code) => this._connexion(code));
    } catch (error) {
      //Il faudrait une demande de validation du choix de lier ce compte à ce téléphone
      Alert.alert("Nouvelle connexion");
      this._connexion(1);
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('code').then((code) => {
      if(code){
        this._connexion_automatique(code);
      }else{
        this.setState({newAccount : true});
      }
    });
  }

 render() {
 		//_MainActivity()
    if (!this.state.newAccount) {
       return (<ActivityIndicator style = {{marginTop: 150}}/>)
    }else{
       return (
         <View style={styles.container}>

            <Text
                 style={[{fontSize: 27 }, styles.centered_text]}>
                 hello world{"\n\n\n"}
             </Text>

         </View>
       );
   	}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
	centered_text: {
		alignSelf: 'stretch',
		textAlign: 'center',
	},
  colorLimit: {
    backgroundColor: '#f7bd13',
  },
});

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
