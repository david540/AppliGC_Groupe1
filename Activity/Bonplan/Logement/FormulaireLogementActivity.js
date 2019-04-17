import React from 'react';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View, ScrollView, Dimensions, Alert, ActivityIndicator, FlatList, Picker, Modal, Image, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import { List, ListItem } from 'react-native-elements'; // Version can be specified in package.json
import { LogementObject } from'./LogementObject';
import { getLogements, logementsAreLoaded } from './DataLoader';
import { getPartenariats, partenairesAreLoaded } from '../../Partenariats/DataLoader';
import { PartenariatObject } from '../../Partenariats/PartenariatObject'; // Version can be specified in package.json

import { validate, isEmpty } from './Validation';
import { styles } from '../../Styles';

import { resetToScreen, goToScreen } from '../../MainActivity';

export default class LogementActivity extends React.Component {

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
        category_type: "Individuel",
        places: '',
        category_locate: 4,
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
            this.setState({nb_placesError: validate('places', '')});
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
            getLogements(() => {this.setState({loadisnotdone: false})}, LogementObject.ALL);
            resetToScreen(navigation, "LogementActivity");
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
        email: 'guilhaume.dauriac@grenoble-inp.org',
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
    }).then((response) => {
        console.log("la reponse");
        console.log(response);
        this.setState({loadisnotdone: false});
      }).catch((error) => {
        console.error(error);
      });
  }



    render() {

        var navigation = this.state.navigation;

        //TODO : Afficher le nombre de places disponibles si l'on propose une colocation
        return (
                <View style={styles.container}>
                    <View style = {{width: this.state.width, height: this.state.height/9, flexDirection: 'row', backgroundColor: '#263238', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color:'white', fontWeight: 'bold', fontSize: 22}}>PROPOSITION DE LOGEMENT</Text>
                    </View>
                    <KeyboardAvoidingView 
                      style={{marginHorizontal: this.state.width/15, marginTop: this.state.height/60, 
                            height: (1 - 1/9 - 1/60)*this.state.height, width: (1 - 2/15)*this.state.width}}
                      behavior="padding">


                      <ScrollView>

                        <Text>Type de logement :</Text>
                        <View style={[styles.field, {height:50}]}>
                            <Picker prompt={"Choisissez le type de logement"}
                              selectedValue={this.state.category_type}
                              onValueChange={(itemValue) => {this.setState({category_type: itemValue})}}>
                                <Picker.Item label="Logement individuel" value="Individuel"/>
                                <Picker.Item label="Colocation" value="Colocation"/>
                            </Picker>
                        </View>

                        <Text>Nombre de place(s) disponible(s) :</Text>
                        <TextInput
                          keyboardType = 'numeric'
                          style={styles.field}
                          placeholder = "Ntmombre de place(s) (1 si logement individuel)"
                          onChangeText={(text) => this.setState({places: text})}
                          onBlur={() => {
                              this.setState({nb_placesError: validate('places', this.state.places)})}}
                        />
                        <Text style={{color:'#ff0000', width:260, marginLeft:15, marginBottom:15}}> 
                            {this.state.nb_placesError} </Text>


                        <Text>Quartier</Text>
                        <View style={[styles.field, {height:50}]}>
                            <Picker prompt={"Sélectionnez le quartier"}
                              selectedValue={this.state.category_locate}
                              onValueChange={(itemValue) => {this.setState({category_locate: itemValue})}}>
                                <Picker.Item label="Hypercentre" value='4'/>
                                <Picker.Item label="Presqu'île" value='5'/>
                                <Picker.Item label="Gare" value='6'/>
                                <Picker.Item label="Ile Verte" value='7'/>
                                <Picker.Item label="Saint-Martin-d'Hères" value='8'/>
                                <Picker.Item label="Est" value='3'/>
                                <Picker.Item label="Ouest" value='1'/>
                                <Picker.Item label="Centre" value='2'/>
                            </Picker>
                        </View>

                        <Text>Adresse :</Text>
                        <View style={{flexDirection:"row"}}>
                            <TextInput
                              style={[styles.field, {width: 50}]}
                              placeholder = "Numéro"
                              onChangeText={(text) => this.setState({adresseNum: text.trim()})}
                              onBlur={() => {
                                  this.setState({adresseNumError: validate('adresseNum', this.state.adresseNum)})}} 
                              />
                            <TextInput
                              style={[styles.field, {width: 180}]}
                              placeholder = "Rue"
                              onChangeText={(text) => this.setState({adresseRue: text.trim()})}
                              onBlur={() => {
                                  this.setState({adresseRueError: validate('adresseRue', this.state.adresseRue)})}} 
                              />
                        </View>      
                        <View style={{flexDirection:"row"}}>
                            <Text style={{color:'#ff0000', width:65, marginLeft:15, marginBottom:15}}> 
                                {this.state.adresseNumError} </Text>
                            <Text style={{color:'#ff0000', width:190, marginLeft:15, marginBottom:15}}> 
                                {this.state.adresseRueError} </Text>
                        </View>

                        <Text>Ville :</Text>
                        <TextInput
                          style={styles.field}
                          placeholder = "Ville"
                          onChangeText={(text) => this.setState({ville: text})}
                          onBlur={() => {
                              this.setState({villeError: validate('ville', this.state.ville)})}}
                        />
                        <Text style={{color:'#ff0000', width:260, marginLeft:15, marginBottom:15}}> 
                            {this.state.villeError} </Text>


                        <Text>Code postal :</Text>
                        <TextInput
                          keyboardType = 'numeric'
                          style={styles.field}
                          placeholder = "Code postal"
                          onChangeText={(text) => this.setState({codePostal: text})}
                          onBlur={() => {
                              this.setState({codePostalError: validate('codePostal', this.state.codePostal)})}}
                        />
                        <Text style={{color:'#ff0000', width:260, marginLeft:15, marginBottom:15}}> 
                            {this.state.codePostalError} </Text>


                        <Text>Surface du logement :</Text>
                        <TextInput
                          keyboardType = 'numeric'
                          style={styles.field}
                          placeholder = "Surface (m²)"
                          onChangeText={(text) => this.setState({surface: text})}
                          onBlur={() => {
                              this.setState({surfaceError: validate('surface', this.state.surface)})}}
                        />
                        <Text style={{color:'#ff0000', width:260, marginLeft:15, marginBottom:15}}> 
                            {this.state.surfaceError} </Text>


                        <Text>Veuillez renseigner une description :</Text>
                        <TextInput
                          style={[styles.field, {height:150, textAlignVertical:'top', paddingLeft: 10, paddingTop: 10, paddingBottom: 10}]}
                          placeholder = "Proximité des transports, commerces à proximité, calme/bruyant, etc..."
                          editable={true}
                          multiline={true}
                          onChangeText={(text) => this.setState({description: text})}
                          onBlur={() => {
                              this.setState({descriptionError: validate('description', this.state.description)})}}
                        />
                        <Text style={{color:'#ff0000', width:260, marginLeft:15, marginBottom:15}}> 
                            {this.state.descriptionError} </Text>


                        <Text>Indiquez le loyer mensuel</Text>
                        <TextInput
                          keyboardType = 'numeric'
                          style={styles.field}
                          placeholder = "Loyer (en €)"
                          onChangeText={(text) => this.setState({prix: text})}
                          onBlur={() => {
                              this.setState({loyerError: validate('loyer', this.state.prix)})}}
                        />
                        <Text style={{color:'#ff0000', width:260, marginLeft:15, marginBottom:15}}> 
                            {this.state.loyerError} </Text>



                        <TouchableOpacity
                          style={{justifyContent:'center'}}
                          onPress={() => { this.submitLogement();}}>

                            <View style={[styles.categoryContainer, {width:this.state.width/2, height:this.state.height/10, marginHorizontal:this.state.width/5, marginBottom:25}]} > 
                                <Text style={{color:'white', fontSize:20}}> Valider </Text>
                            </View> 
                        </TouchableOpacity>
                        <Text style={{color:'#ff0000', width:260, marginLeft:this.state.width/5, marginBottom:15}}> 
                            {this.state.validationError} </Text>
                      </ScrollView>
                    </KeyboardAvoidingView>
                </View>
               )

    }

}
