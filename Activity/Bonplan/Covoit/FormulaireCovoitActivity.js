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
            ok = false;
        }
        if (isEmpty(this.state.arrival)) {
            ok = false;
        }
        if (!ok) {
            this.setState({validationError: validate('validation', '')});
            return false
        }
        return true
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
                        <Text style = {[styles.text_neutral, styles.form_text_field]}> yo </Text>
                    </KeyboardAvoidingView>
                </View>
               );
    }
}
