import React from 'react';
import { StyleSheet, Text, ListView, Picker, TextInput, View, ScrollView, Dimensions, AsyncStorage, SectionList, Alert, FlatList, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { EventObject } from './EventObject';
import { getEvents, getEventsDev, getArrayOfEvents, getArrayOfSectionData } from './EventLoader';
import { List, ListItem } from 'react-native-elements'; // Version can be specified in package.json
import EventRenderInList from './EventRenderInList'; // Version can be specified in package.json
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ChoixFiltresActivity from './ChoixFiltresActivity'
import { getAssos, eventsAreLoaded, getOnlyEvents } from './AssoLoader'
import { styles } from '../Styles'

/*
 * Exemple de 2ème activité
 */

export default class ActualitesActivity extends React.Component {

  constructor(props){
    super(props);
    this.listeAssos = []
    this.listeEcoles = []
    this.superAdmin = false;
    this.arrayOfChoixAssos = [];
    this.nomAsso = this.capitalizeFirstLetter(this.props.navigation.state.params.nomasso);
    if(!this.props.navigation.state.params.idEcole){
    //  Alert.alert("n");
    }
    //Alert.alert(this.props.navigation.state.params.nomasso + " " + this.nomAsso);
    //this.getListeEcolesAndListeAssos();
    //this.getChoixAssosFromFile()
    this.state = {
        navigation: props.navigation,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - getStatusBarHeight(),
        idEcole: this.props.navigation.state.params.idEcole? this.props.navigation.state.params.idEcole: 0,
        modalVisible: false,
        modalAdminVisible: false,
        loadisnotdone: true,
        numAssoAdmin: '0',
        idEvent: 0,
        itemModal: "",
        titleModal: "",
        descriptionModal: "",
        dateFin : "01-01-01 00:00:00",
        dateDebut : "01-01-01 00:00:00",
        cible : "",
        asso: "",
    }
  }

  // getListeEcolesAndListeAssos(){
  //   var listes = getAssosAndEvents(()=>{});
  //   var compteurAssos = 0;
  //   var compteurEcole = 0;
  //   for(i = 0 ; i < listes.length; i++){
  //     if(listes[i].id >= 10){
  //       this.listeAssos[compteurAssos++] = listes[i];
  //     }else{
  //       this.listeEcoles[compteurEcole++] = listes[i];
  //     }
  //   }
  // }


  // getChoixAssosFromFile(){
  //   try{
  //     AsyncStorage.getItem('choixassos').then((choixAssos) => {
  //       if(choixAssos)
  //         this.arrayOfChoixAssos = choixAssos.split(";");
  //     });
  //   }catch(error){
  //     //le fichier n'existe pas, premiere utilisation ?
  //     this.arrayOfChoixAssos = [];
  //   }
  // }

  componentDidMount(){
    //this.getEventsDev();
    getEvents(this.props.navigation.state.params.code == 10 ? 0: this.state.idEcole, () => this.setState({loadisnotdone : false}));
    //this.arrayOfEvents = ;
    //Alert.alert(JSON.stringify(this.arrayOfEvents));
    //getOnlyEvents(()=>{this.setState({loadisnotdone : false})})
  }
/*
  getEventsDev() {
    //fetch('http://inprod.grandcercle.org/appli2019/loadEvents.php', {
      fetch('http://inprod.grandcercle.org/appli2019/loadEvents.php', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
    }).then((response) => {
        this.arrayOfEvents = JSON.parse(response._bodyText);
        this.setState({loadisnotdone: false});
    })
  }
*/
  ori_change = () => {
      this.setState({
        width: Dimensions.get('window').width, height: Dimensions.get('window').height - getStatusBarHeight()
      });
  }

  componentWillMount() {
    Dimensions.addEventListener("change", this.ori_change);
    EventRenderInList.currentDate = 0;
  }

  componentWillUnmount() {
    // Important to stop updating state after unmount
    Dimensions.removeEventListener("change", this.ori_change);
  }

  openModal(item){
    this.setState({idEvent: item.id, itemModal: item, descriptionModal: item.description, titleModal: item.nom, modalVisible: true, dateDebut: item.getDateDebut(), dateFin: item.getDateFin(), cible: item.ecole, asso: item.asso});
  }
  closeModal = () => {
    //this.setChoixAssosInFile();
    this.setState({modalVisible: false, loadisnotdone:true});
    getEvents(this.props.navigation.state.params.code == 10 ? 0 : this.state.idEcole, () => this.setState({loadisnotdone : false}));
    //this.getEventsDev();
  }

  _goToAdmin(){
    this.setState({modalAdminVisible: true});
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  demandeAssoAdmin(){
    fetch('http://inprod.grandcercle.org/appli2019/changeAssoAdmin.php', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email: this.props.navigation.state.params.email,
          password: this.props.navigation.state.params.password,
          asso: this.state.numAssoAdmin
      })}).then((response) => {
      this.nomAsso = this.capitalizeFirstLetter(response._bodyText);
      AsyncStorage.setItem('asso', this.state.numAssoAdmin).then(() => {
        this.setState({asso:this.state.numAssoAdmin});
        Alert.alert("Changement d'asso vers " + this.nomAsso + " effectué");
      })
      //this.props.navigation.navigate('MainActivity');
      }).catch((error) => {
              console.error(error);
        });
  }

  deleteEvent(item){
    fetch('http://inprod.grandcercle.org/appli2019/deleteEvent.php', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email: this.props.navigation.state.params.email,
          password: this.props.navigation.state.params.password,
          asso: this.state.asso,
          id: this.state.idEvent,
      })}).then((response) => {
        //Alert.alert(response._bodyText);
      //this.props.navigation.navigate('MainActivity');
  }).catch((error) => {
          console.error(error);
    });
  }
  // setChoixAssosInFile(){
  //   var chaine = "";
  //   for(i = 0 ; i < this.arrayOfChoixAssos.length - 1; i++){
  //     chaine = chaine.concat(this.arrayOfChoixAssos[i].toString().concat(";"));
  //   }
  //   if(this.arrayOfChoixAssos.length > 0)
  //     chaine = chaine.concat(this.arrayOfChoixAssos[this.arrayOfChoixAssos.length - 1]);
  //   AsyncStorage.setItem('choixassos', chaine);
  // }
  dateInCorrectOrder(dateInYYYYmmdd){
    return dateInYYYYmmdd.split("/").reverse().join("/");
  }

  reload() {
    this.setState({loadisnotdone:true});
    getEvents(this.props.navigation.state.params.code == 10 ? 0 : this.state.idEcole, () => this.setState({loadisnotdone : false}), true);
  }

	render() {
    var dataSourceAdmin = null;
    let picker= <View/>;
    if(!this.props.navigation.state.params.email){
     picker = <View style={{height: this.state.height*1/18}}>
      <Picker
        selectedValue={this.state.idEcole}
        onValueChange={(itemValue) => {{AsyncStorage.setItem('idEcole', itemValue); this.setState({idEcole: itemValue}, () => {this.reload();});}}}>
        <Picker.Item label="TOUTE ECOLE" value="0" />
        <Picker.Item label="ENSIMAG" value="1" />
        <Picker.Item label="PHELMA" value="2" />
        <Picker.Item label="ENSE3" value="3" />
        <Picker.Item label="PAGORA" value="4" />
        <Picker.Item label="GI" value="5" />
        <Picker.Item label="CPP" value="6" />
        <Picker.Item label="ESISAR" value="7" />
      </Picker>
      </View>;
    }
    let button = <View style = {{flexDirection: 'row', backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center', height: this.state.height/9}}>
      <TouchableOpacity onPress={() => { this.setState({loadisnotdone:true}); getEvents(this.props.navigation.state.params.code == 10 ? 0 : this.state.idEcole, () => this.setState({loadisnotdone : false}), true)}}>
        <Text style = {{color:'white', marginLeft: this.state.width / 3}}>RECHARGER</Text>
      </TouchableOpacity>
    </View>;
    if(parseInt(this.props.navigation.state.params.asso) > 0){
      button =   <View style = {{flexDirection: 'row', backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center', height: this.state.height/9}}>
          {(this.props.navigation.state.params.code > 0)?
            (<TouchableOpacity onPress={() => { this._goToAdmin() }}>
              <Text style = {{color:'white', marginLeft: this.state.width / 7}}>Admin</Text>
            </TouchableOpacity>):(<Text></Text>)}
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('AddEvent', {asso: this.props.navigation.state.params.asso,
            nomasso: this.nomAsso,
            idEcole: this.state.idEcole,
            droitInp: this.props.navigation.state.params.droitInp});}}>
            <Text style = {{color:'white', marginLeft: this.state.width / 7}}>AJOUTER</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.setState({loadisnotdone:true}); getEvents(this.props.navigation.state.params.code == 10 ? 0 : this.state.idEcole, () => this.setState({loadisnotdone : false}), 1) }}>
            <Text style = {{color:'white', marginLeft: this.state.width / 7}}>RECHARGER</Text>
          </TouchableOpacity>
        </View>;}
    else if(this.props.navigation.state.params.code > 0){
      button = <View style = {{flexDirection: 'row', backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center', height: this.state.height/9}}>
        <TouchableOpacity onPress={() => { this._goToAdmin() }}>
          <Text style = {{color:'white', marginLeft: this.state.width / 7}}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.setState({loadisnotdone:true}); getEvents(this.props.navigation.state.params.code == 10 ? 0 : this.state.idEcole, () => this.setState({loadisnotdone : false}), 1) }}>
          <Text style = {{color:'white', marginLeft: this.state.width / 7}}>RECHARGER</Text>
        </TouchableOpacity>
      </View>;
    }



    return (
      this.state.loadisnotdone
      ? (
        <View style={{justifyContent: 'center', alignItems: 'center', height:this.state.height, width:this.state.width}}>
          <Text>Chargement des informations</Text>
          <Text>Vérifiez que vous êtes connecté à internet</Text>
          <ActivityIndicator/>
        </View>
      )
      : (
        <View style={[styles.container, {width: this.state.width, height: this.state.height}]}>
          <View style = {{width: this.state.width, height: this.state.height/9, flexDirection: 'row', backgroundColor: '#263238', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>CALENDRIER COMMUN</Text>
            <View style = {{marginLeft: 42}}>
              <TouchableOpacity onPress={() => { resetToScreen(this.state.navigation, "MainActivity") }}>
                <Text style = {{color:'white'}}>Retour</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.colorLimit, { height: this.state.height*1/80, width: this.state.width }]}/>

          {button}

          {picker}
          <View style={{backgroundColor: '#FFFFFF', width: this.state.width, height: this.state.height * (1 - 1/9 - 1/9 - 1/80)}}>

          <SectionList

            renderSectionHeader={({ section }) => (
              <View style={{ padding: 8, backgroundColor: "#4fc3c8" }}>
                <Text style={{ color: "white" }}>{this.dateInCorrectOrder(section.key)}</Text>
              </View>)
            }
            renderItem={({item}) => (
              <ListItem
                button onPress={() => {
                  this.openModal(item);
                }}
                title={item.nom}
                subtitle={item.getDateDebut().split(" ")[1].split(":")[0] + "h" + item.getDateDebut().split(" ")[1].split(":")[1] }
              />
            )}

            sections={getArrayOfSectionData()}

            keyExtractor= {item => item}
          />

          </View>
          <Modal
              visible={this.state.modalAdminVisible}
              animationType={'fade'}
              onRequestClose={() => this.setState({modalAdminVisible: false})}
              transparent={false}
          >
            <View style={styles.modalBackgroundContainer}>
              <TextInput
                 onChangeText={(text) => this.setState({numAssoAdmin: text})}
                 value={this.state.numAssoAdmin}
               />
               <TouchableOpacity onPress={() => {
                 this.demandeAssoAdmin();
                 this.setState({modalAdminVisible: false});}}>
                 <Text style={{color:'grey'}}> Valider </Text>
               </TouchableOpacity>
            </View>

          </Modal>
          <Modal
              visible={this.state.modalVisible}
              animationType={'fade'}
              onRequestClose={() => this.closeModal()}
              transparent={true}
          >
            <View style={styles.modalBackgroundContainer}>
              <View style= {[styles.modalContainer, {height: this.state.height*8/9, width: this.state.width*8/9}]}>
                <View style= {{height: this.state.height*7/9}}>
                  <ScrollView contentContainerStyle={styles.scrollViewModalContainer}>
                    <View style={[styles.modalTitleBox, {width: this.state.width*8/9}]}>
                      <Text style={styles.modalTitleText}>{this.state.titleModal}</Text>
                    </View>
                      <View style={[styles.colorLimitModal, { height: this.state.height * 1/200, width: this.state.width * 8/9 }]}/>
                      <Text style= {styles.modalDescriptionTitleText}>{"\n"}Description</Text>

                      <View style={{margin:10}} />
                      <Text style= {styles.modalDescriptionReductionText}>{this.state.descriptionModal}{"\n \n"}</Text>
                      <Text style= {styles.modalDescriptionTitleText}>{"\nDate :"}</Text>

                      <View style={{margin:10}} />
                      <Text style= {styles.modalDescriptionReductionText}>{"Début: Le " + this.state.dateDebut.split(" ")[0].split("-").join("/") +
                      " à " + this.state.dateDebut.split(" ")[1].split(":")[0] + "h" + this.state.dateDebut.split(" ")[1].split(":")[1] +
                      "\nFin:  Le " + this.state.dateFin.split(" ")[0].split("-").join("/") +
                      " à " + this.state.dateFin.split(" ")[1].split(":")[0] + "h" + this.state.dateFin.split(" ")[1].split(":")[1]}
                      </Text>
                    <View style={{margin:10}} />

                  </ScrollView>
                </View>
                <View style = {styles.modalButtons}>
                  {(this.state.asso == this.props.navigation.state.params.asso)?
                  (
                    <TouchableOpacity onPress={() => {
                      this.deleteEvent();
                      this.props.navigation.navigate('AddEvent', {asso: this.props.navigation.state.params.asso,
                        nomasso: this.props.navigation.state.params.nomasso,
                        idEcole: this.state.idEcole,
                        droitInp: this.props.navigation.state.params.droitInp,
                        nom: this.state.titleModal,
                        description: this.state.descriptionModal,
                        dateDebut: this.state.dateDebut,
                        dateFin: this.state.dateFin
                        });
                      this.closeModal();
                      }}>
                        <Text style={{color:'grey'}}> DELETE </Text>
                    </TouchableOpacity>
                  )
                  :(<Text></Text>)}

                  <TouchableOpacity onPress={() => this.closeModal()}>
                      <Text style={{color:'grey'}}> RETOUR </Text>
                  </TouchableOpacity>
                </View>
                <Text></Text>
              </View>
            </View>
          </Modal>
        </View>
      )
    );

	}
}

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

const _renderSeparator = () => (
  <View style={{ height: 1, backgroundColor: 'grey', marginLeft: 80 }} />
)
