import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert, ScrollView, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';

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
    );
	}
}

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
