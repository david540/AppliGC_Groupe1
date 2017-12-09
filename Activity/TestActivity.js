import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class TestActivity extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        navigation: props.navigation
    }
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
      <View style={{width:_width,height:_height}}>
        <View style={{width:_width,height:_height/2, flexDirection: 'row'}}>
          <View style={{width:_width/2,height:_height/2, backgroundColor: 'blue'}} />
          <View style={{width:_width/2,height:_height/2, backgroundColor: 'red'}} />
          <View style={{width:_width/2,height:_height/2, position:'absolute', justifyContent: 'center', alignItems: 'center'}}>
            <Button
              onPress={() => { resetToScreen(navigation, "MainActivity")}}
              title = "Click !"
              backgroundColor = 'blue'
            />
            <Text style={[{color:'white'}, styles.centered_text]}>Vous voilà arrivé sur une autre activité de lapplication</Text>
          </View>
        </View>
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
