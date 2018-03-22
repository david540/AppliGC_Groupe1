/* @flow */

import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions,  Alert, FlatList, TouchableOpacity } from 'react-native';
import { List } from 'react-native-elements'; // Version can be specified in package.json
import { NavigationActions } from 'react-navigation';
import { EventObject } from './EventObject';
import EventRenderInList from './EventRenderInList'; // Version can be specified in package.json

/*
 * Exemple de 2ème activité
 */

export default class ActualitesActivity extends React.Component {

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
    EventRenderInList.currentDate = 0;
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
    var _width = Dimensions.get('window').width; //full width
    var _height = Dimensions.get('window').height; //full height
    var _array = [];
    _array.push(new EventObject(10, 3, 2018, 20, 0, 21, 0, "Soirée E3", "Description Soirée E3 aaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa", 0));
    _array.push(new EventObject(10, 3, 2018, 19, 0, 22, 30, "Kfet Phelma", "Description Kfet Phelma", 1));
    _array.push(new EventObject(11, 3, 2018, 20, 0, 22, 30, "Soirée Papet", "Description Soirée Papet", 2));
    _array.push(new EventObject(11, 3, 2018, 20, 0, 22, 30,"Soirée Papet", "Description Soirée Papet", 3));
    _array.push(new EventObject(11, 3, 2018, 20, 0, 22, 30,"Soirée Papet", "Description Soirée Papet", 4));
    _array.push(new EventObject(11, 3, 2018, 20, 0, 22, 30,"Soirée Papet", "Description Soirée Papet", 5));
    _array.push(new EventObject(11, 3, 2018, 20, 0, 22, 30,"Soirée Papet", "Description Soirée Papet", 6));
    _array.push(new EventObject(11, 3, 2018, 20, 0, 22, 30,"Soirée Papet", "Description Soirée Papet", 7));
    _array.push(new EventObject(11, 3, 2018, 20, 0, 22, 30,"Soirée Papet", "Description Soirée Papet", 8));
    _array.push(new EventObject(11, 3, 2018, 20, 0, 22, 30,"Soirée Papet", "Description Soirée Papet", 9));
    _array.push(new EventObject(12, 3, 2018, 20, 0, 22, 30,"NOM assez", "Description Soirée Papet", 10));
    _array.push(new EventObject(12, 3, 2018, 20, 0, 22, 30,"NOM trop long pour tenir sur une seule ligne", "Description Soirée Papet", 11));


    return (
      <View style={styles.container}>
        <View style = {{width: _width, height: _height/9, flexDirection: 'row', backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'white', fontWeight:'bold', fontSize:18, marginTop: 30}}>CALENDRIER COMMUN</Text>
          <View style = {{marginLeft: 60}}>
            <TouchableOpacity onPress={() => { resetToScreen(this.state.navigation, "MainActivity") }}>
              <Text style = {{color:'white', marginTop: 30}}>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{flex:1}}>
        <List>
          <FlatList
          data={_array}
          renderItem= {
            ({item}) => (
              <EventRenderInList
                nomEvent = {item.nomEvent}
                intDate = {item.intDate}
                dateStylee = {item.dateStylee}
                heureD = {item.heureD}
                minuteD = {item.minuteD < 10 ? "0" + item.minuteD : item.minuteD}
                heureF = {item.heureF}
                minuteF = {item.minuteF < 10 ? "0" + item.minuteF : item.minuteF}
                description = {item.description}
              />
            )
          }
          keyExtractor= {item => item.id}
          />
        </List>
        </ScrollView>
      </View>
    );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
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
