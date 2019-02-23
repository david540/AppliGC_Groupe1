import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert, ScrollView, Picker, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import Dialog from "react-native-dialog";
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';

/*
 * Exemple de 2ème activité
 */
export default class NewAuthentificationActivity extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        navigation: props.navigation,
        email: '',
        username: '',
        password: '',
        ecole: '',
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
                 Demander ses identifiants {"\n\n\n"}
             </Text>
             <TextInput placeholder='   Adresse mail'
             style = {{borderWidth:1}}
              maxLength = {20}
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.setState({username: text})}
              value = {this.state.username}/>
            <View style = {{height:this.state.height/20}}/>


            <Text
                style={[{fontSize: 14 }]}>
                Choisir votre école
            </Text>

            <View style={{height: this.state.height*1/9}}>
                <Picker
                  selectedValue={this.state.ecole}
                  onValueChange={(itemValue) => {this.setState({ecole: itemValue})}}>
                  <Picker.Item label={"1. Ensimag"} value={"Ensimag"} />
                  <Picker.Item label={"2. Phelma"} value={"Phelma"} />
                  <Picker.Item label={"3. Ense3"} value={"Ense3"} />
                  <Picker.Item label={"4. Pagora"} value={"Pagora"} />
                  <Picker.Item label={"5. Génie Ind"} value={"Génie Ind"} />
                  <Picker.Item label={"6. CPP"} value={"CPP"} />
                  <Picker.Item label={"7. Esisar"} value={"Esisar"} />
                </Picker>
            </View>
             <View style={{margin:10}} />
             <Button
               onPress={this._onPressSubmit}
               title="envoyer"
               color="#333745">
             </Button>
             <View style={{margin:50}} />

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