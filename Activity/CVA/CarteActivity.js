import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

/*
 * Exemple de 2ème activité
 */
export default class CarteActivity extends React.Component {

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

	render() {
		//_MainActivity()
    const { params } = this.props.navigation.state;
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
        <View style={{width:this.state.width,height:this.state.height*(1 - 1/9 - 1/80), justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f0f'}}>
          <Text style={[{color:'white'}, styles.centered_text]}>Numéro CVA: {params.num_cva}</Text>
          <Text style={[{color:'white'}, styles.centered_text]}>Nom: {params.nom}</Text>
          <Text style={[{color:'white'}, styles.centered_text]}>Prénom: {params.prenom}</Text>
        </View>
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
