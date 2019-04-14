import React from 'react';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { goToScreen, resetToScreen} from '../MainActivity.js';

import { styles } from '../Styles';

export default class BonplanActivity extends React.Component {

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
    }

    componentWillUnmount() {
      // Important to stop updating state after unmount
      Dimensions.removeEventListener("change", this.ori_change);
    }


    _onPressLearnMore(){
  		resetToScreen(this.state.navigation, "MainActivity");
  	}

    _onLongPressCovoit(){
        Alert.alert("Consulter et proposer des offres de covoiturage")
    }

    _onLongPressLogement(){
        Alert.alert("Consulter et proposer des offres de logement")
    }

    _onLongPressStage(){
        Alert.alert("Consulter et proposer des offres de stage")
    }

    _onLongPressMateriel(){
        Alert.alert("Consulter et proposer des prêts, locations ou ventes de matériel")
    }

    render() {
        var navigation = this.state.navigation;
        return(
         	<View style={styles.main_container}>
        		<View style = {styles.top_banner}>
        			<Text style={[styles.text_neutral, styles.titleContainerText]}>BONS PLANS</Text>
          	    </View>

                <View style = {[styles.empty, {height: this.state.height*5/30}]}/>

                <View style={styles.button_row}>
                  <TouchableOpacity 
                    onPress={() => { goToScreen(navigation, "CovoitActivity")}}
                    onLongPress={this._onLongPressCovoit}>
                      <View style={[styles.bonplan_button, {backgroundColor: '#4A148C'}]}>
                          <Image style={{alignSelf: 'center'}} source={require('./assets/covoit.png')}/>     
                          <Text style={[styles.text_neutral, styles.bubbleTitleText]}> Covoit </Text>
                      </View>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress= {() => { goToScreen(navigation, "LogementActivity")}}
                    onLongPress={this._onLongPressLogement}>
                      <View style={[styles.bonplan_button, {backgroundColor: '#6A1B9A'}]}>
                          <Image style={{alignSelf: 'center'}} source={require('./assets/logement.png')}/>     
                          <Text style={[styles.text_neutral, styles.bubbleTitleText]}> Logement </Text>
                      </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.button_row}>
                  <TouchableOpacity 
                    onPress={() => { goToScreen(navigation, "StageActivity")}}
                    onLongPress={this._onLongPressStage}>
                      <View style={[styles.bonplan_button, {backgroundColor: '#7B1FA2'}]}>
                          <Image style={{alignSelf: 'center'}} source={require('./assets/stage.png')}/>     
                          <Text style={[styles.text_neutral, styles.bubbleTitleText]}> Offres de stage </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress= {() => { goToScreen(navigation, "MaterielActivity")}}
                    onLongPress={this._onLongPressMateriel}>
                      <View style={[styles.bonplan_button, {backgroundColor: '#8E24AA'}]}>
                          <Image style={{alignSelf: 'center'}} source={require('./assets/materiel.png')}/>     
                          <Text style={[styles.text_neutral, styles.bubbleTitleText]}> Vente de matériel </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.page_container}/>

            </View>
            );
    }
}
