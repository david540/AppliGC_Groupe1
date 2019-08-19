import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, AsyncStorage, Button, Alert, TextInput, Picker, FlatList, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import Textarea from 'react-native-textarea';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from "react-native-modal-datetime-picker";
import { NavigationActions } from 'react-navigation';
import { EventObject } from './EventObject';
import { getEvents } from './EventLoader';
import EventRenderInList from './EventRenderInList'; // Version can be specified in package.json
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ChoixFiltresActivity from './ChoixFiltresActivity'
import { getAssosAndEvents, eventsAreLoaded, getOnlyEvents } from './AssoLoader'

/*
 * Exemple de 2ème activité
 */

export default class AddEvent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        navigation: props.navigation,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - getStatusBarHeight(),
        modalVisible: false,
        loadisnotdone: true,
        nom :this.props.navigation.state.params.nom,
        description:this.props.navigation.state.params.description,
        cible: "0",
        prevente : "0",
        dateD:this.props.navigation.state.params.dateDebut?this.SQLDatetoDate(this.props.navigation.state.params.dateDebut): new Date(),
        dateF:this.props.navigation.state.params.dateFin?this.SQLDatetoDate(this.props.navigation.state.params.dateFin): "",
        isDateTimePickerVisibleD: false,
        isDateTimePickerVisibleF: false,
    }
  }

  dateToSQLDate(date){
    var retour=  date.getFullYear() + '-' +
        ('00' + (date.getMonth()+1)).slice(-2) + '-' +
        ('00' + date.getDate()).slice(-2) + ' ' +
        ('00' + date.getHours()).slice(-2) + ':' +
        ('00' + date.getMinutes()).slice(-2) + ':' +
        ('00' + date.getSeconds()).slice(-2);

    return retour;
  }

  SQLDatetoDate(date){
    infos = date.split(" ");
    yyyymmdd = infos[0].split("-").reverse().join("/");
    return new Date(yyyymmdd + " " + infos[1]);
  }

  showDateTimePickerD = () => {
    this.setState({ isDateTimePickerVisibleD: true });
  };

  hideDateTimePickerD = () => {
    this.setState({ isDateTimePickerVisibleD: false });
  };

  handleDatePickedD = date => {
    this.setState({dateD: date});
    console.log(this.state.dateD);
    this.hideDateTimePickerD();
  };
  showDateTimePickerF = () => {
    this.setState({ isDateTimePickerVisibleF: true });
  };

  hideDateTimePickerF = () => {
    this.setState({ isDateTimePickerVisibleF: false });
  };

  handleDatePickedF = date => {
    this.setState({dateF: date});
    console.log(this.state.dateF);
    this.hideDateTimePickerF();
  };
  renderDate(data){
    return(String(data));
  }

  _validationFailed= () => { Alert.alert("Echec", "Vous n'avez pas rempli tous les champs");
                        };
  _onPressSubmit= () => {
          AsyncStorage.getItem('ecole').then((ecole) => {
          console.log(ecole);
          var maCible = ecole;
          if(this.state.cible != 0) {
            maCible = "Inp";
          }
        //  Alert.alert(this.props.navigation.state.params.asso);

          //fetch('http://inprod.grandcercle.org/appli2019/addEvent.php', {
          fetch('http://inprod.grandcercle.org/appli2019/addEvent.php', {
        //fetch('http://inprod.grandcercle.org/appli2019//phpFiles/logincva.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nom: this.state.nom,
                description: this.state.description + " (ajouté par "+ this.props.navigation.state.params.nomasso +")",
                cible: maCible,
                prevente: this.state.prevente,
                dateD: this.dateToSQLDate(this.state.dateD),
                dateF: this.dateToSQLDate(this.state.dateF),
                asso: this.props.navigation.state.params.asso
            })})
        }).then((response) => {
            //console.log(response);
            Alert.alert("Evènement créé avec succès");
            this.props.navigation.navigate('MainActivity');
        }).catch((error) => {
                console.error(error);
          });
        };

	render() {
    return(
      <View style={styles.container}>
        <View style = {{width: this.state.width, height: this.state.height/9, flexDirection: 'row', backgroundColor: '#333745', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'white', fontWeight: 'bold', fontSize: 16, marginTop: this.state.height/50}}>Evenement</Text>
          <View style = {{marginLeft: 150}}>
            <TouchableOpacity onPress={() => { resetToScreen(this.state.navigation, "MainActivity") }}>
              <Text style = {{color:'white', marginTop: this.state.height/50}}>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.colorLimit, { height: this.state.height*1/80, width: this.state.width }]}/>
        <ScrollView style={{padding: 20}}>
          <Text
              style={[{fontSize: 27 }, styles.centered_text]}>
              Ajouter un événement {"\n\n\n"}
              pour {this.props.navigation.state.params.nomasso}
          </Text>
          <TextInput placeholder="   Nom de L'évenement"
          style = {{borderWidth:1, marginBottom: 5}}
           maxLength = {50}
           underlineColorAndroid="transparent"
           onChangeText={(text) => this.setState({nom: text})}
           value = {this.state.nom}/>
           <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            onChangeText={(text) => this.setState({description: text})}
            value = {this.state.description}
            maxLength={500}
            placeholder="Description"
            placeholderTextColor={'#c7c7c7'}
            underlineColorAndroid={'transparent'}
          />
          <View style={{margin:5}} />
          <Text
              style={[{fontSize: 14 }]}>
              Choisir cible
          </Text>
          <View style={{margin:5}} />
          <View style={{height: this.state.height*1/9}}>
              <Picker
                selectedValue={this.state.cible}
                onValueChange={(itemValue) => {this.setState({cible: itemValue})}}>
                <Picker.Item label={"1. Ecole"} value={"0"} />
                <Picker.Item label={"2. INP"} value={"1"} />
              </Picker>
          </View>
          <View style={{margin:5}} />
          <Text
              style={[{fontSize: 14 }]}>
              Type de prévente
          </Text>

          <View style={{height: this.state.height*1/9}}>
              <Picker
                selectedValue={this.state.prevente}
                onValueChange={(itemValue) => {this.setState({prevente: itemValue})}}>
                <Picker.Item label={"1. Sur l'application"} value={"0"} />
                <Picker.Item label={"2. En école"} value={"1"} />
                <Picker.Item label={"3. Les deux "} value={"2"} />
              </Picker>
          </View>
          <View style={{margin:5}} />
          <Button color="#333745" title="Choisir date de début" onPress={this.showDateTimePickerD} />
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisibleD}
            onConfirm={this.handleDatePickedD}
            onCancel={this.hideDateTimePickerD}
            mode="datetime"
          />
          <Text
              style={[{fontSize: 14, marginBottom: 5, marginTop: 5 }]}>
              Date début : {this.renderDate(this.state.dateD)}
          </Text>
          <Button color="#333745" title="Choisir date de fin" onPress={this.showDateTimePickerF} />
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisibleF}
            onConfirm={this.handleDatePickedF}
            onCancel={this.hideDateTimePickerF}
            minimumDate = {this.state.dateD}
            mode="datetime"
          />
          <Text
              style={[{fontSize: 14, marginBottom: 5, marginTop: 5 }]}>
              Date fin : {this.renderDate(this.state.dateF)}
          </Text>
          <View style={{margin:10}} />
          <Button
            onPress={() => {
                if(this.state.nom === "" || this.state.description === "" || this.state.dateF === ""){
                    this._validationFailed();
                }
                else{this._onPressSubmit()}
            }}
            title="Valider"
            color="#333745">
          </Button>
          <View style={{margin:20}} />
          </ScrollView>
        </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  colorLimit: {
    backgroundColor: '#f7bd13',
  },
  modalBackgroundContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100,100,100,0.5)',
  },
  modalContainer: {
    backgroundColor:'white',
    alignItems: 'center',
  },
  textareaContainer: {
  height: 180,
  padding: 5,
  backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
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
