/* @flow */

import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions,  Alert, FlatList, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { EventObject } from './EventObject';
import { getEvents } from './EventLoader';
import EventRenderInList from './EventRenderInList'; // Version can be specified in package.json
import { getStatusBarHeight } from 'react-native-status-bar-height';

/*
 * Exemple de 2ème activité
 */

export default class ActualitesActivity extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        navigation: props.navigation,
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
    var _array = getEvents();
    /*_array.push(new EventObject(0, 10, 3, 2018, 20, 0, 21, 0, "Soirée E3", "Description Soirée E3 aaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa"));
    _array.push(new EventObject(1, 10, 3, 2018, 19, 0, 22, 30, "Kfet Phelma", "Description Kfet Phelma"));
    _array.push(new EventObject(2, 11, 3, 2018, 20, 0, 22, 30, "Soirée Papet", "Description Soirée Papet"));
    _array.push(new EventObject(3, 11, 3, 2018, 20, 0, 22, 30,"Soirée Papet", "Description Soirée Papet"));
    _array.push(new EventObject(4, 11, 3, 2018, 20, 0, 22, 30,"Soirée Papet", "Description Soirée Papet"));
    _array.push(new EventObject(5, 11, 3, 2018, 20, 0, 22, 30,"Soirée Papet", "Description Soirée Papet"));
    _array.push(new EventObject(6, 11, 3, 2018, 20, 0, 22, 30,"Soirée Papet", "Description Soirée Papet"));*/


    return (
      <View style={[styles.container, {width: this.state.width, height: this.state.height}]}>
        <View style = {{width: this.state.width, height: this.state.height/9, flexDirection: 'row', backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'white', fontWeight:'bold', fontSize:18, marginTop: this.state.height/50}}>CALENDRIER COMMUN</Text>
          <View style = {{marginLeft: 60}}>
            <TouchableOpacity onPress={() => { resetToScreen(this.state.navigation, "MainActivity") }}>
              <Text style = {{color:'white', marginTop: this.state.height/50}}>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.colorLimit, { height: this.state.height*1/80, width: this.state.width }]}/>
        <View style={{backgroundColor: '#0f0f0f', width: this.state.width, height: this.state.height * (1 - 1/9 - 1/80)}}>
          <View style={{backgroundColor: '#fcfcfc'}}>
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
            <View style={{height: 1, backgroundColor: '#808080'}}/>
          </View>
        </View>
      </View>
    );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
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
