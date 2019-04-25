import React from 'react';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity, ActivityIndicator, TextInput, KeyboardAvoidingView } from 'react-native';
import { goToScreen, resetToScreen} from '../../MainActivity.js';
import { styles } from '../../Styles';

import { validate } from './Validation';
  
export default class CovoitActivity extends React.Component {

  	constructor(props){
    		super(props);
    		this.state = {
    		    navigation: props.navigation,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - getStatusBarHeight(),
                loadisnotdone: false,

                page: 'offer', // 0 stands for offers, 1 for demands

                departure: '',
                arrival: '',
                hour: '',
                min: '',
                
                departureError: '',
                arrivalError: '',

        }
  	}

    render() {
        return(
                <View style={styles.main_container}>
                    <View style={styles.top_banner}>
                        <View style={styles.top_left_banner}>
                            <Text style={[styles.text_neutral, styles.page_title_left]}> COVOITURAGES </Text>
                        </View>
                        <View style = {styles.top_right_banner}>
                            <TouchableOpacity onPress={() => { goToScreen(this.state.navigation, "BonplanActivity") }}>
                                <Text style = {[styles.text_neutral, styles.top_right_text]}>Consulter mes trajets</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.yellow_strip}/>
                    <View style={styles.tabs}>
                        <View style={styles.tab_2}>
                            <TouchableOpacity onPress={() => { this.setState({page: 'demand'}) }}>
                                <Text style = {[styles.text_neutral, styles.top_right_text]}> Offres </Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.tab_2}>
                            <TouchableOpacity onPress={() => { this.setState({page: 'offer'}) }}>
                                <Text style = {[styles.text_neutral, styles.top_right_text]}> Demandes </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.thin_yellow_strip}/>
                    <View style={[styles.empty, {height:this.state.height/80}]}/>

                    <Text style={[styles.text_neutral, styles.field_name_covoit]}>Ville de départ :</Text>
                    <TextInput
                      style={styles.form_field_regular}
                      placeholder = "Ville de départ"
                      onChangeText={(text) => this.setState({departure: text})}
                      onBlur={() => {
                          this.setState({departureError: validate('departure', this.state.departure)})}}
                    />
                    <Text style={[styles.text_neutral, styles.form_incomplete_error_regular]}> 
                        {this.state.departureError} </Text>

                    <Text style={[styles.text_neutral, styles.field_name_covoit]}>{"Ville d'arrivée :"}</Text>
                    <TextInput
                      style={styles.form_field_regular}
                      placeholder = "Ville d'arrivée"
                      onChangeText={(text) => this.setState({arrival: text})}
                      onBlur={() => {
                          this.setState({arrivalError: validate('arrival', this.state.arrival)})}}
                    />
                    <Text style={[styles.text_neutral, styles.form_incomplete_error_regular]}> 
                        {this.state.arrivalError} </Text>
                </View>
        );
    }
}

