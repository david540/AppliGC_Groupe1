import React from 'react';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles, goToScreen, resetToScreen} from '../MainActivity.js';


export default class BonplanActivity extends React.Component {

    constructor(props){
    		super(props);
    		this.state = {
    		    navigation: props.navigation,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - getStatusBarHeight(),
                loadisnotdone: false
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

    render() {
        var navigation = this.state.navigation;
        return(
         	<View style={styles.main_container}>
        		<View style = {[styles.titleContainerBox, {width: this.state.width, height: this.state.height/10, backgroundColor:"#000000"}]}>
        			<Text style={styles.titleContainerText}>BONS PLANS</Text>
          	</View>

            <View style={[styles.rowContainer, {width:this.state.width, height:this.state.height*9/20, backgroundColor:"#000000"}]}>
              <TouchableOpacity onPress={() => { goToScreen(navigation, "CovoitActivity")}}>
                <View style={[styles.categoryContainer,{width:this.state.width/2, height:this.state.height*9/20, backgroundColor:"#d956f7"}]}>
                          <Text style={{color:'white', fontWeight:'100'}}> Covoit </Text>
                          <Text style={[{color:'#cccccc'}, styles.centered_text]}>Consulter et proposer des offres de covoiturage</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress= {() => { goToScreen(navigation, "LogementActivity")}}>
                <View style={[styles.categoryContainer,{width:this.state.width/2, height:this.state.height*9/20, backgroundColor:"#8900a8"}]}>
                          <Text style={{color:"white"}}> Logement </Text>
                          <Text style={[{color:'#cccccc'}, styles.centered_text]}>Consulter et proposer des offres de logement</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[styles.rowContainer, {width:this.state.width, height:this.state.height*9/20, backgroundColor:"#000000"}]}>
              <TouchableOpacity onPress={() => { goToScreen(navigation, "StageActivity")}}>
                <View style={[styles.categoryContainer,{width:this.state.width/2, height:this.state.height*9/20, backgroundColor:"#9320ad"}]}>
                          <Text style={{color:'white', fontWeight:'100'}}> Offres de stage </Text>
                          <Text style={[{color:'#cccccc'}, styles.centered_text]}>Consulter et proposer des offres de stage</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress= {() => { goToScreen(navigation, "MaterielActivity")}}>
                <View style={[styles.categoryContainer,{width:this.state.width/2, height:this.state.height*9/20, backgroundColor:"#6c0284"}]}>
                          <Text style={{color:"white"}}> Echange de matériel </Text>
                          <Text style={[{color:'#cccccc'}, styles.centered_text]}>connectez vous pour profiter au maximum de nos fonctionnalités !</Text>
                </View>
              </TouchableOpacity>
            </View>

        </View>

        );
    }
}
