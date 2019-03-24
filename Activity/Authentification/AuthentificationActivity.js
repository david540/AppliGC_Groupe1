import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert, ScrollView, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import Dialog from "react-native-dialog";
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';

/*
 * Exemple de 2ème activité
 */
export default class AuthentificationActivity extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        navigation: props.navigation,
        email: '',
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
                        //this.setState({newAccount: true});
      };

  _setInfos(responseJson){
      //var infos = responseJson.split("&&&");
      console.log("coucou");
      console.log(responseJson);
      if(responseJson.num_cva && responseJson.Prenom && responseJson.Nom && responseJson.Ecole){

          this._goToAuthentificated(responseJson.num_cva, responseJson.Nom, responseJson.Prenom, responseJson.Ecole);
      }
      else{
          Alert.alert("erreur, pas de données");
      }

  }


  _connexion = (_code) =>{
      fetch('http://192.168.0.12/phpFiles/logincva.php', {
      //fetch('http://172.20.10.10/phpFiles/logincva.php', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: this.state.email,
              password: this.state.password,
              code: _code,
          })
      }).then((response) => {
          console.log(response);
          console.log("anas");
          var body = JSON.parse(response._bodyText);
          console.log(body);
          this._setInfos(body);
      }).catch((error) => {
              console.error(error);
        });
  }

    _connexion_automatique(_code){
        AsyncStorage.getItem('email').then((email) => {this.state.email = email;
        AsyncStorage.getItem('password').then((password) => {this.state.password = password;
            //Alert.alert(password);
            if(username != '' && password != ''){
                this._connexion(_code)
            }else{
                this.setState({newAccount: true});
            }
        });});
    }


  _onPressSubmit = () => {
      var code = 0;
      try {
          AsyncStorage.setItem('email', this.state.email);
          AsyncStorage.setItem('password', this.state.password);
          AsyncStorage.multiGet(['email', 'password']).then((data)=> {
              console.log("retour mail : " + data[0][1]);
          });
          AsyncStorage.getItem('code').then((code) => this._connexion(code));
      } catch (error) {
          //Il faudrait une demande de validation du choix de lier ce compte à ce téléphone
          Alert.alert("Nouvelle connexion");
          this._connexion(1);
      }
  }
  _goToAuthentificated(numCVA, nom, prenom, ecole){
      AsyncStorage.setItem('numCVA', numCVA);
      AsyncStorage.setItem('nom', nom);
      AsyncStorage.setItem('prenom', prenom);
      AsyncStorage.setItem('ecole', ecole);
        this.props.navigation.navigate('Authentificated', {
        num_cva: numCVA,
        nom: nom,
        prenom: prenom,
        ecole: ecole,
        });
  }
  _onPressLearnMore(){
    Alert.alert('TODO')
  }
  _validCharOrNum(lettre){
    return lettre.length === 1 && (lettre.match(/[a-z]/i) || lettre.match(/[0-9]/));
  }
  _validNum(lettre){
    return lettre.length === 1 && lettre.match(/[0-9]/);
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
           <View style = {{width: this.state.width, height: this.state.height/9, flexDirection: 'row', backgroundColor: '#333745', justifyContent: 'center', alignItems: 'center'}}>
             <Text style={{color:'white', fontWeight: 'bold', fontSize: 16, marginTop: this.state.height/50}}>Authentification</Text>
             <View style = {{marginLeft: 150}}>
               <TouchableOpacity onPress={() => { resetToScreen(this.state.navigation, "MainActivity") }}>
                 <Text style = {{color:'white', marginTop: this.state.height/50}}>Retour</Text>
               </TouchableOpacity>
             </View>
           </View>
           <View style={[styles.colorLimit, { height: this.state.height*1/80, width: this.state.width }]}/>
           <ScrollView style={{padding: 20}}>
             <Text
                 style={[{fontSize: 27 }, styles.centered_text]}>
                 Se connecter {"\n\n\n"}
             </Text>
             <TextInput placeholder='   Adresse mail'
             style = {{borderWidth:1}}
              maxLength = {20}
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.setState({email: text})}
              value = {this.state.email}/>
             <TextInput placeholder='   Mot de passe'
              style = {{borderWidth:1, marginTop:10}}
              maxLength = {20}
              secureTextEntry={true}
              autocorrect={false}
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.setState({password: text})}
              value = {this.state.password}/>
             <View style={{margin:10}} />
             <Button
               onPress={() => {
                   if(this.state.email === "" || this.state.password === ""){
                       this._authFailed();
                   }
                   else{this._onPressSubmit()}
               }}
               title="Se connecter"
               color="#333745">
             </Button>
             <View style={{margin:50}} />
             <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('AccountRequestActivity')
             }}>
               <View style={{width:8*this.state.width/9, height:this.state.height*1/10, backgroundColor:"#ffffff"}}>
                    <Text style={{textAlign: 'center',color:'blue', textDecorationLine: 'underline'}}> Demander ses identifiants ? </Text>
               </View>
             </TouchableOpacity>

           </ScrollView>
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
  rowContainer: {
	  flexDirection: 'row',
	},
	categoryContainer: {

    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#FFFFFF'
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
