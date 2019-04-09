import React from 'react';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View, ScrollView, Dimensions, Alert, ActivityIndicator, FlatList, Picker, Modal, Image, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import { List, ListItem } from 'react-native-elements'; // Version can be specified in package.json
import { LogementObject } from'./LogementObject';
import { getLogement, logementsAreLoaded } from './DataLoader';
import { getPartenariats, partenairesAreLoaded } from '../../Partenariats/DataLoader';
import { PartenariatObject } from '../../Partenariats/PartenariatObject'; // Version can be specified in package.json

import { resetToScreen, goToScreen, styles } from '../../MainActivity';

export default class LogementActivity extends React.Component {

  	constructor(props){
    		super(props);
     this.state = {
        navigation: props.navigation,
        category: PartenariatObject.ALL,
        partenaires: [],
        modalVisible: false,
        titleModal: '404 not found',
        descriptionModal: '404 not found',
        reductionsModal: '404 not found',
        itemModal: null,
        urlImageModal: 'https://blog.sqlauthority.com/i/a/errorstop.png',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - getStatusBarHeight(),
        loadisnotdone: partenairesAreLoaded()
        }
    }
      
    render() {

        var navigation = this.state.navigation;

        //TODO : Afficher le nombre de places disponibles si l'on propose une colocation
        return (
                <View style={styles.container}>
                    <View style = {{width: this.state.width, height: this.state.height/9, flexDirection: 'row', backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color:'white', fontWeight: 'bold', fontSize: 18}}>PROPOSITION DE LOGEMENT</Text>
                    </View>
                    <KeyboardAvoidingView 
                      style={{marginHorizontal: this.state.width/15, marginTop: this.state.height/60, 
                            height: (1 - 1/9 - 1/60)*this.state.height, width: (1 - 2/15)*this.state.width}}
                      behavior="padding">
                      <ScrollView>
                        <Text>Type de logement :</Text>
                        <View style={[styles.field, {height:50}]}>
                            <Picker prompt={"Choisissez le type de logement"}
                              selectedValue={this.state.category}
                              onValueChange={(itemValue) => {this.setState({category: itemValue, itemValue})}}>
                                <Picker.Item label="Logement individuel" value="Logement individuel"/>
                                <Picker.Item label="Colocation" value="Colocation"/>
                            </Picker>
                        <Text>Nombre de place(s) disponible(s) :</Text>
                        <TextInput
                          keyboardType = 'numeric'
                          style={styles.field}
                          placeholder = "Nombre de place(s) (1 si logement individuel)"
                        />
                        </View>
                        <Text>Quartier</Text>
                        <View style={[styles.field, {height:50}]}>
                            <Picker prompt={"Sélectionnez le quartier"}
                              selectedValue={this.state.category}
                              onValueChange={(itemValue) => {this.setState({category: itemValue, itemValue})}}>
                                <Picker.Item label="Hypercentre" value="Hypercentre"/>
                                <Picker.Item label="Presqu'île" value="Presqu'île"/>
                                <Picker.Item label="Gare" value="Gare"/>
                                <Picker.Item label="Ile Verte" value="Ile Verte"/>
                                <Picker.Item label="Saint-Martin-d'Hères" value="Saint-Martin-d'Hères"/>
                            </Picker>
                        </View>
                        <Text>Adresse :</Text>
                        <TextInput
                          style={styles.field}
                          placeholder = "Adresse"
                        />
                        <Text>Ville :</Text>
                        <TextInput
                          style={styles.field}
                          placeholder = "Ville"
                        />
                        <Text>Code postal :</Text>
                        <TextInput
                          keyboardType = 'numeric'
                          style={styles.field}
                          placeholder = "Code postal"
                        />
                        <Text>Surface du logement :</Text>
                        <TextInput
                          keyboardType = 'numeric'
                          style={styles.field}
                          placeholder = "Surface (m²)"
                        />
                        <Text>Veuillez renseigner une description :</Text>
                        <TextInput
                          style={[styles.field, {height:150, textAlignVertical:'top', paddingLeft: 10, paddingTop: 10, paddingBottom: 10}]}
                          placeholder = "Proximité des transports, commerces à proximité, calme/bruyant, etc..."
                          editable={true}
                          multiline={true}
                        />
                        <Text>Indiquez le loyer mensuel</Text>
                        <TextInput
                          keyboardType = 'numeric'
                          style={styles.field}
                          placeholder = "Loyer (en €)"
                        />
                        <TouchableOpacity
                          style={{justifyContent:'center'}}
                          onPress={() => { goToScreen(navigation, "LogementActivity")}}>
                            <View style={[styles.categoryContainer, {width:this.state.width/2, height:this.state.height/10, marginHorizontal:this.state.width/5, marginBottom:this.state.height/10}]} > 
                                <Text style={{color:'white', fontSize:20}}> Valider </Text>
                            </View> 
                        </TouchableOpacity>
                      </ScrollView>
                    </KeyboardAvoidingView>
                </View>
               )

    }

}
