import React from 'react';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View, ScrollView, Dimensions, Alert, ActivityIndicator, FlatList, Picker, Modal, Image, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import { List, ListItem } from 'react-native-elements'; // Version can be specified in package.json
import { LogementObject } from'./LogementObject';
import { getLogement, logementsAreLoaded } from './DataLoader';
import { getPartenariats, partenairesAreLoaded } from '../../Partenariats/DataLoader';
import { PartenariatObject } from '../../Partenariats/PartenariatObject'; // Version can be specified in package.json

import { validate, isEmpty } from './Validation';
import { styles } from '../../Styles';

import { resetToScreen, goToScreen } from '../../MainActivity';

export default class FormulaireLogementActivity extends React.Component {

  	constructor(props){
    		super(props);
     this.state = {
        navigation: props.navigation,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - getStatusBarHeight(),
        loadisnodone: true,

        adresseNum: '',
        adresseRue: '',
        codePostal: '',
        ville: '',
        category_type: 'Coloc',
        nb_places: '',
        category_locate: LogementObject.ALL,
        description: '',
        longitude: '0',
        latitude: '0',
        prix: '',
        surface: '',

        nb_placesError: '',
        adresseNumError: '',
        adresseRueError: '',
        villeError: '',
        codePostalError: '',
        surfaceError: '',
        descriptionError: '',
        loyerError: '',
        validationError: ''

        }
    }

    // Cette fonction est appelée au moment de la validation.
    // Elle vérifie que tous les champs sont nuls. Si ce n'est pas le cas,
    // les messages d'erreur correspondant apparaissent sous les champs concernés
    // et la validation est refusés (booléen 'ok')
    finalValidation() {
        ok=true;
        if (isEmpty(this.state.nb_places)) {
            this.setState({nb_placesError: validate('nb_places', '')});
            ok = false;
        }
        if (isEmpty(this.state.adresseNum)) {
            this.setState({adresseNumError: validate('adresseNum', '')});
            ok = false;
        }
        if (isEmpty(this.state.adresseRue)) {
            this.setState({adresseRueError: validate('adresseRue', '')});
            ok = false;
        }
        if (isEmpty(this.state.ville)) {
            this.setState({villeError: validate('adresseRue', '')});
            ok = false;
        }
        if (isEmpty(this.state.codePostal)) {
            this.setState({codePostalError: validate('codePostal', '')});
            ok = false;
        }
        if (isEmpty(this.state.surface)) {
            this.setState({surfaceError: validate('surface', '')});
            ok = false;
        }
        if (isEmpty(this.state.description)) {
            this.setState({descriptionError: validate('description', '')});
            ok = false;
        }
        if (isEmpty(this.state.loyer)) {
            this.setState({loyerError: validate('loyer', '')});
            ok = false;
        }

        if (!ok) {
            this.setState({validationError: validate('validation', '')});
            return false
        }
        return true;
    }

    submitLogement() {
        var navigation = this.state.navigation;
        if (this.finalValidation()) {
            this._request();
            goToScreen(navigation, "LogementActivity");
        } else {
            this.state.validationError = validate('validation', '');
        }
    }

    _request(){
    fetch('http://192.168.43.152/GC/set_logements_info.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        numAd: this.state.adresseNum,
        rueAd: this.state.adresseRue,
        codePostal: this.state.codePostal,
        ville: this.state.ville,
        type: this.state.category_type,
        places: this.state.places,
        quartier: this.state.category_locate,
        description: this.state.description,
        prix: this.state.prix,
        surface: this.state.surface,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
        this.setState({loadisnotdone: false});
      }).catch((error) => {
        console.error(error);
      });
  }



    render() {

        var navigation = this.state.navigation;

        return (
                <View style={styles.container}>
                    <View style = {styles.top_banner}>
                        <Text style={[styles.text_neutral,  styles.page_title_left]}>PROPOSITION DE LOGEMENT</Text>
                    </View>
                    <KeyboardAvoidingView 
                      style={styles.form_page}
                      behavior="padding">

                      <ScrollView>

                        <Text style={[styles.text_neutral, styles.form_text_field_log]}>Type de logement :</Text>
                        <View style={styles.picker_form_regular}>
                            <Picker prompt={"Choisissez le type de logement"}
                              selectedValue={this.state.category_type}
                              onValueChange={(itemValue) => {this.setState({category_type: itemValue})}}>
                                <Picker.Item label="Logement individuel" value="Logement individuel"/>
                                <Picker.Item label="Colocation" value="Colocation"/>
                            </Picker>
                        </View>

                        <Text style={[styles.text_neutral, styles.form_text_field_log]}>Nombre de place(s) disponible(s) :</Text>
                        <TextInput
                          keyboardType = 'numeric'
                          style={styles.form_field_regular}
                          placeholder = "Nombre de place(s) (1 si logement individuel)"
                          onChangeText={(text) => this.setState({nb_places: text})}
                          onBlur={() => {
                              this.setState({nb_placesError: validate('nb_places', this.state.nb_places)})}}
                        />
                        <Text style={[styles.text_neutral, styles.form_incomplete_error_regular]}> 
                            {this.state.nb_placesError} </Text>


                        <Text style={[styles.text_neutral, styles.form_text_field_log]}>Quartier</Text>
                        <View style={styles.picker_form_regular}>
                            <Picker prompt={"Sélectionnez le quartier"}
                              selectedValue={this.state.category_locate}
                              onValueChange={(itemValue) => {this.setState({category_locate: itemValue})}}>
                                <Picker.Item label="Hypercentre" value="Hypercentre"/>
                                <Picker.Item label="Presqu'île" value="Presqu'île"/>
                                <Picker.Item label="Gare" value="Gare"/>
                                <Picker.Item label="Ile Verte" value="Ile Verte"/>
                                <Picker.Item label="Saint-Martin-d'Hères" value="Saint-Martin-d'Hères"/>
                            </Picker>
                        </View>

                        <Text style={[styles.text_neutral, styles.form_text_field_log]}>Adresse :</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput
                              style={styles.form_field_short}
                              placeholder = "Numéro"
                              onChangeText={(text) => this.setState({adresseNum: text.trim()})}
                              onBlur={() => {
                                  this.setState({adresseNumError: validate('adresseNum', this.state.adresseNum)})}} 
                              />
                            <TextInput
                              style={styles.form_field_medium}
                              placeholder = "Rue"
                              onChangeText={(text) => this.setState({adresseRue: text.trim()})}
                              onBlur={() => {
                                  this.setState({adresseRueError: validate('adresseRue', this.state.adresseRue)})}} 
                              />
                        </View>      
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.text_neutral, styles.form_incomplete_error_short]}> 
                                {this.state.adresseNumError} </Text>
                            <Text style={[styles.text_neutral, styles.form_incomplete_error_medium]}> 
                                {this.state.adresseRueError} </Text>
                        </View>

                        <Text style={[styles.text_neutral, styles.form_text_field_log]}>Ville :</Text>
                        <TextInput
                          style={styles.form_field_regular}
                          placeholder = "Ville"
                          onChangeText={(text) => this.setState({ville: text})}
                          onBlur={() => {
                              this.setState({villeError: validate('ville', this.state.ville)})}}
                        />
                        <Text style={[styles.text_neutral, styles.form_incomplete_error_regular]}> 
                            {this.state.villeError} </Text>


                        <Text style={[styles.text_neutral, styles.form_text_field_log]}>Code postal :</Text>
                        <TextInput
                          keyboardType = 'numeric'
                          style={styles.form_field_regular}
                          placeholder = "Code postal"
                          onChangeText={(text) => this.setState({codePostal: text})}
                          onBlur={() => {
                              this.setState({codePostalError: validate('codePostal', this.state.codePostal)})}}
                        />
                        <Text style={[styles.text_neutral, styles.form_incomplete_error_regular]}> 
                            {this.state.codePostalError} </Text>


                        <Text style={[styles.text_neutral, styles.form_text_field_log]}> Surface du logement :</Text>
                        <TextInput
                          keyboardType = 'numeric'
                          style={styles.form_field_regular}
                          placeholder = "Surface (m²)"
                          onChangeText={(text) => this.setState({surface: text})}
                          onBlur={() => {
                              this.setState({surfaceError: validate('surface', this.state.surface)})}}
                        />
                        <Text style={[styles.text_neutral, styles.form_incomplete_error_regular]}> 
                            {this.state.surfaceError} </Text>


                        <Text style={[styles.text_neutral, styles.form_text_field_log]}> Veuillez renseigner une description :</Text>
                        <TextInput
                          style={styles.form_field_desc}
                          placeholder = "Proximité des transports, commerces à proximité, calme/bruyant, etc..."
                          editable={true}
                          multiline={true}
                          onChangeText={(text) => this.setState({description: text})}
                          onBlur={() => {
                              this.setState({descriptionError: validate('description', this.state.description)})}}
                        />
                        <Text style={[styles.text_neutral, styles.form_incomplete_error_regular]}> 
                            {this.state.descriptionError} </Text>


                        <Text style={[styles.text_neutral, styles.form_text_field_log]}>Indiquez le loyer mensuel</Text>
                        <TextInput
                          keyboardType = 'numeric'
                          style={styles.form_field_regular}
                          placeholder = "Loyer (en €)"
                          onChangeText={(text) => this.setState({loyer: text})}
                          onBlur={() => {
                              this.setState({loyerError: validate('loyer', this.state.loyer)})}}
                        />
                        <Text style={[styles.text_neutral, styles.form_incomplete_error_regular]}> 
                            {this.state.loyerError} </Text>

                        <TouchableOpacity
                          style={{justifyContent:'center'}}
                          onPress={() => { this.submitLogement();}}>

                            <View style={styles.form_validation_button} > 
                                <Text style={[styles.text_neutral, styles.form_validation_button_text]}> Valider </Text>
                            </View> 
                        </TouchableOpacity>
                        <Text style={[styles.text_neutral, styles.form_incomplete_error_regular]}> 
                            {this.state.validationError} </Text>
                      </ScrollView>
                    </KeyboardAvoidingView>
                </View>
               )

    }

}
