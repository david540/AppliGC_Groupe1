import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert, ScrollView, TextInput, TouchableOpacity } from 'react-native';
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

  _nbCharLim = 20;
  _authFailed = () => { Alert.alert("Echec", "Nom de compte ou mot de passe incorrect") };

	_onPressLearnMore(){
		Alert.alert('TODO')
	}
  _validChar(lettre){
    return lettre.length === 1 && lettre.match(/[a-z]/i);
  }
  _validNum(lettre){
    return lettre.length === 1 && lettre.match(/[0-9]/);
  }
  _onPressSubmit = () => {
    console.log("Connexion" + this.state.username + " " + this.state.password);
    if(this.state.username.length > this._nbCharLim || this.state.password > this._nbCharLim){
      this._authFailed();
      return;
    }
    for(var i=0; i < this.state.username.length; i++){
      if( ! this._validNum(this.state.username.charAt(i)) ){
        this._authFailed();
        return;
      }
    }
    for(var i=0; i < this.state.password.length; i++){
      if( ! this._validChar(this.state.password.charAt(i)) ){
        this._authFailed();
        return;
      }
    }
  }

	render() {
		//_MainActivity()
    navigation = this.state.navigation;
    var _width = Dimensions.get('window').width; //full width
    var _height = Dimensions.get('window').height; //full height
    return (
      <View style={styles.container}>
        <View style = {{width: this.state.width, height: this.state.height/9, flexDirection: 'row', backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'white', fontWeight: 'bold', fontSize: 18, marginTop: this.state.height/50}}>CVA</Text>
          <View style = {{marginLeft: 80}}>
            <TouchableOpacity onPress={() => { resetToScreen(this.state.navigation, "MainActivity") }}>
              <Text style = {{color:'white', marginTop: this.state.height/50}}>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.colorLimit, { height: this.state.height*1/80, width: this.state.width }]}/>
        <ScrollView style={{padding: 20}}>
          <Text
              style={{fontSize: 27}}>
              Login
          </Text>
          <TextInput placeholder='Username'
           maxLength = {20}
           onChangeText={(text) => this.setState({username: text})}
           value = {this.state.username}/>
          <TextInput placeholder='Password'
           maxLength = {20}
           onChangeText={(text) => this.setState({password: text})}
           value = {this.state.password}/>
          <View style={{margin:7}} />
          <Button
            onPress={this._onPressSubmit}
            title="Submit"
          />
        </ScrollView>
      </View>
    );
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
