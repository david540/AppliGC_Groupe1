import React from 'react';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity, ActivityIndicator, TextInput, Picker, KeyboardAvoidingView } from 'react-native';
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

                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.text_neutral, styles.form_text_field]}>Ville de départ</Text>
                        <Text style={[styles.text_neutral, styles.form_text_field]}>{"Ville d'arrivée"}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                          style={styles.form_field_half}
                          placeholder = "Ville de départ"
                          onChangeText={(text) => this.setState({adresseNum: text.trim()})}
                          onBlur={() => {
                              this.setState({departureError: validate('departure', this.state.departure)})}} 
                          />
                        <TextInput
                          style={styles.form_field_half}
                          placeholder = "Ville d'arrivée"
                          onChangeText={(text) => this.setState({adresseRue: text.trim()})}
                          onBlur={() => {
                              this.setState({arrivalError: validate('arrival', this.state.arrival)})}} 
                          />
                    </View>      
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.text_neutral, styles.form_incomplete_error_half]}> 
                            {this.state.departureError} </Text>
                        <Text style={[styles.text_neutral, styles.form_incomplete_error_half]}> 
                            {this.state.arrivalError} </Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.text_neutral, styles.form_text_field]}>Heure de départ</Text>
                        <Text style={[styles.text_neutral, styles.form_text_field]}>minutes</Text>
                    </View>
                    <View style = {{flexDirection: 'row'}}>
                        <View style={styles.form_picker_hour}>
                            <Picker prompt={"Heure"}
                              selectedValue={this.state.hour}
                              onValueChange={(itemValue) => {this.setState({hour: itemValue})}}>
                                <Picker.Item label="00" value="00"/>
                                <Picker.Item label="01" value="01"/>
                                <Picker.Item label="02" value="02"/>
                                <Picker.Item label="03" value="03"/>
                                <Picker.Item label="04" value="04"/>
                                <Picker.Item label="05" value="05"/>
                                <Picker.Item label="06" value="06"/>
                                <Picker.Item label="07" value="07"/>
                                <Picker.Item label="08" value="08"/>
                                <Picker.Item label="09" value="09"/>
                                <Picker.Item label="10" value="10"/>
                                <Picker.Item label="11" value="11"/>
                                <Picker.Item label="12" value="12"/>
                                <Picker.Item label="13" value="13"/>
                                <Picker.Item label="14" value="14"/>
                                <Picker.Item label="15" value="15"/>
                                <Picker.Item label="16" value="16"/>
                                <Picker.Item label="17" value="17"/>
                                <Picker.Item label="18" value="18"/>
                                <Picker.Item label="19" value="19"/>
                                <Picker.Item label="20" value="20"/>
                                <Picker.Item label="21" value="21"/>
                                <Picker.Item label="22" value="22"/>
                                <Picker.Item label="23" value="23"/>
                            </Picker>
                        </View>
                        <View style={styles.form_picker_hour}>
                            <Picker prompt={"Minutes"}
                              selectedValue={this.state.min}
                              onValueChange={(itemValue) => {this.setState({category_locate: min})}}>
                                <Picker.Item label="00" value="00"/>
                                <Picker.Item label="05" value="05"/>
                                <Picker.Item label="10" value="10"/>
                                <Picker.Item label="15" value="15"/>
                                <Picker.Item label="20" value="20"/>
                                <Picker.Item label="25" value="25"/>
                                <Picker.Item label="30" value="30"/>
                                <Picker.Item label="35" value="35"/>
                                <Picker.Item label="40" value="40"/>
                                <Picker.Item label="45" value="45"/>
                                <Picker.Item label="50" value="50"/>
                                <Picker.Item label="55" value="55"/>
                            </Picker>
                        </View>
                    </View>

                </View>
        );
    }
}

