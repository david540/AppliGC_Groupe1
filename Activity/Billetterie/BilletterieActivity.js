import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

/*
 * Exemple de 2ème activité
 */
export default class BilletterieActivity extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        navigation: props.navigation,
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

	_onPressLearnMore(){
		Alert.alert('TODO')
	}
	render() {
		//_MainActivity()
    navigation = this.state.navigation;
    var _width = Dimensions.get('window').width; //full width
    var _height = Dimensions.get('window').height; //full height
    return (
      <View style={{width:_width,height:_height, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
        <Button
          onPress={() => { resetToScreen(navigation, "MainActivity")}}
          title = "Retour"
          color = "red"
        />
        <Text style={[{color:'white'}, styles.centered_text]}>Vous voilà arrivé sur l activité de billetterie</Text>
      </View>
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
