import React from 'react';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View, ScrollView, Dimensions, Alert, ActivityIndicator, FlatList, Picker, Modal, Image, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import { List, ListItem } from 'react-native-elements'; // Version can be specified in package.json
// import { LogementObject } from'./LogementObject';
// import { getLogement, logementsAreLoaded } from './DataLoader';
import { getPartenariats, partenairesAreLoaded } from '../../Partenariats/DataLoader';
import { PartenariatObject } from '../../Partenariats/PartenariatObject'; // Version can be specified in package.json

import { validate, isEmpty } from './Validation';
import { styles } from '../../Styles';

import { resetToScreen, goToScreen } from '../../MainActivity';

export default class FormulaireCovoitActivity extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            navigation: props.navigation,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height - getStatusBarHeight(),

            departure: '',
            arrival: '',
            hour: '',
            min: '',
            type: '',

            departureError: '',
            arrivalError: '',
            validationError: '',
        }
    }

    finalValidation() {
        ok = true;
        if (isEmpty(this.state.departure)) {
            this.setState({departureError: validate('departure', '')});
            ok = false;
        }
        if (isEmpty(this.state.arrival)) {
            this.setState({arrivalError: validate('arrival', '')});
            ok = false;
        }
        if (!ok) {
            this.setState({validationError: validate('validation', '')});
            return false
        }
        return true
    }

    submitCovoit() {
        var navigation = this.state.navigation;
        if (this.finalValidation()) {
            this._request();
            goToScreen(navigation, "CovoitActivity");
        } else {
            this.state.validationError = validate('validation', '');
        }
    }

    render () {
        
        var navigation = this.state.navigation;

        return (
                <View style = {styles.container}>
                    <View style = {styles.top_banner}>
                        <Text style = {[styles.text_neutral, styles.page_title_left]}> {"AJOUT D'UN TRAJET"} </Text>
                    </View>
                    <KeyboardAvoidingView
                      style = {styles.form_page}
                      behavior = "padding" >

                        <Text style = {[styles.text_neutral, styles.form_text_field]}> {"Choisissez l'objet de l'ajout"} : </Text>
                        <View style={styles.picker_form_regular}>
                            <Picker prompt={"Choisissez le type de logement"}
                              selectedValue={this.state.type}
                              onValueChange={(itemValue) => {this.setState({type: itemValue})}}>
                                <Picker.Item label="Proposition" value="offer"/>
                                <Picker.Item label="Demande" value="demand"/>
                            </Picker>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.text_neutral, styles.form_text_field_half]}>Ville de départ</Text>
                            <Text style={[styles.text_neutral, styles.form_text_field_half]}>{"Ville d'arrivée"}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <TextInput
                              style={styles.form_field_half}
                              placeholder = "Ville de départ"
                              onChangeText={(text) => this.setState({departure: text.trim()})}
                              onBlur={() => {
                                  this.setState({departureError: validate('departure', this.state.departure)})}}
                              />
                            <TextInput
                              style={styles.form_field_half}
                              placeholder = "Ville d'arrivée"
                              onChangeText={(text) => this.setState({arrival: text.trim()})}
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
                                  style={styles.form_picker_style_hour}
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
                                  style={styles.form_picker_style_hour}
                                  onValueChange={(itemValue) => {this.setState({min: itemValue})}}>
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
                        <Text style={[styles.text_neutral, styles.form_text_field]}>{"Date"}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.form_picker_hour}>
                                <Picker prompt={"Jour"}
                                  selectedValue={this.state.day}
                                  style={styles.form_picker_style_hour}
                                  onValueChange={(itemValue) => {this.setState({day: itemValue})}}>
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
                                    <Picker.Item label="24" value="24"/>
                                    <Picker.Item label="25" value="25"/>
                                    <Picker.Item label="26" value="26"/>
                                    <Picker.Item label="27" value="27"/>
                                    <Picker.Item label="28" value="28"/>
                                    <Picker.Item label="29" value="29"/>
                                    <Picker.Item label="30" value="30"/>
                                    <Picker.Item label="31" value="31"/>
                                </Picker>
                            </View>
                            <View style={styles.form_picker_month}>
                                <Picker prompt={"Mois"}
                                  selectedValue={this.state.month}
                                  style={styles.form_picker_style_hour}
                                  onValueChange={(itemValue) => {this.setState({month: itemValue})}}>
                                    <Picker.Item label="Janvier" value = "Janvier"/>
                                    <Picker.Item label="Février" value = "Février"/>
                                    <Picker.Item label="Mars" value = "Mars"/>
                                    <Picker.Item label="Avril" value = "Avril"/>
                                    <Picker.Item label="Mai" value = "Mai"/>
                                    <Picker.Item label="Juin" value = "Juin"/>
                                    <Picker.Item label="Juillet" value = "Juillet"/>
                                    <Picker.Item label="Août" value = "Août"/>
                                    <Picker.Item label="Septembre" value = "Septembre"/>
                                    <Picker.Item label="Octobre" value = "Octobre"/>
                                    <Picker.Item label="Novembre" value = "Novembre"/>
                                    <Picker.Item label="Décembre" value = "Décembre"/>
                                </Picker>
                            </View>
                        </View>

                        <TouchableOpacity
                          style={{justifyContent:'center'}}
                          onPress={() => { this.submitCovoit();}}>

                            <View style={[styles.form_validation_button, {marginTop: this.state.height/8}]} > 
                                <Text style={[styles.text_neutral, styles.form_validation_button_text]}> Valider </Text>
                            </View> 
                        </TouchableOpacity>
                        <Text style={[styles.text_neutral, styles.form_incomplete_error_regular]}> 
                            {this.state.validationError} </Text>

                    </KeyboardAvoidingView>
                </View>
               );
    }
}
