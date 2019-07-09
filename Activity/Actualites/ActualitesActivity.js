import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, AsyncStorage, Alert, FlatList, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { EventObject } from './EventObject';
//import { getEvents, getEventsDev } from './EventLoader';
import { List, ListItem } from 'react-native-elements'; // Version can be specified in package.json
import EventRenderInList from './EventRenderInList'; // Version can be specified in package.json
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ChoixFiltresActivity from './ChoixFiltresActivity'
import { getAssosAndEvents, eventsAreLoaded, getOnlyEvents } from './AssoLoader'
import { styles } from '../Styles'

/*
 * Exemple de 2ème activité
 */

export default class ActualitesActivity extends React.Component {

  constructor(props){
    super(props);
    this.listeAssos = []
    this.listeEcoles = []
    this.arrayOfChoixAssos = []
    this.arrayOfEvents = []
    //this.getListeEcolesAndListeAssos();
    //this.getChoixAssosFromFile()
    this.state = {
        navigation: props.navigation,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - getStatusBarHeight(),
        modalVisible: false,
        loadisnotdone: true,
        itemModal: "",
        titleModal: "",
        descriptionModal: "",
        dateFin : "",
        dateDebut : "",
        cible : "",
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
    this.getEventsDev();
    //getOnlyEvents(()=>{this.setState({loadisnotdone : false})})
  }

  getEventsDev() {
    //fetch('http://192.168.0.13/AppliGC_Groupe1/phpFiles/loadEvents.php', {
      fetch('http://172.20.10.10/AppliGC_Groupe1/phpFiles/loadEvents.php', {
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
    this.setState({itemModal: item, descriptionModal: item[1], titleModal: item[0], modalVisible: true, dateDebut: item[2], dateFin: item[3], cible: item[5]});
  }
  closeModal = () => {
    //this.setChoixAssosInFile();
    this.setState({modalVisible: false});
    this.setState({loadisnotdone:true});
    this.getEventsDev();
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

	render() {
    let button = <View style = {{flexDirection: 'row', backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center', height: this.state.height/9}}>
      <TouchableOpacity onPress={() => { this.openModal() }}>
        <Text style = {{color:'white'}}>FILTRES</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { this.setState({loadisnotdone:true});this.getEventsDev();}}>
        <Text style = {{color:'white', marginLeft: this.state.width / 3}}>RECHARGER</Text>
      </TouchableOpacity>
    </View>;
    if(this.props.navigation.state.params.asso === '1'){
      button =   <View style = {{flexDirection: 'row', backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center', height: this.state.height/9}}>
          <TouchableOpacity onPress={() => { this.openModal() }}>
            <Text style = {{color:'white'}}>FILTRES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('AddEvent', {});}}>
            <Text style = {{color:'white', marginLeft: this.state.width / 7}}>AJOUTER</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.setState({loadisnotdone:true}); this.getEventsDev();}}>
            <Text style = {{color:'white', marginLeft: this.state.width / 7}}>RECHARGER</Text>
          </TouchableOpacity>
        </View>;}




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
          <View style={{backgroundColor: '#0f0f0f', width: this.state.width, height: this.state.height * (1 - 1/9 - 1/9 - 1/80)}}>
          <List>
            <FlatList
            data={this.arrayOfEvents}
            renderItem={({item}) => (
              <ListItem
                button onPress={() => {
                  this.openModal(item);
                }}
                title={item[0]}
                subtitle={item[1]}
              />
            )}
            />
          </List>

          </View>
          <Modal
              visible={this.state.modalVisible}
              animationType={'fade'}
              onRequestClose={() => this.closeModal()}
              transparent={true}
          >
            <View style={styles.modalBackgroundContainer}>
              <View style= {[styles.modalContainer, {height: this.state.height*8/9, width: this.state.width*8/9}]}>
                <ScrollView contentContainerStyle={styles.scrollViewModalContainer}>
                  <View style={[styles.modalTitleBox, {width: this.state.width*8/9}]}>
                    <Text style={styles.modalTitleText}>{this.state.titleModal}</Text>
                  </View>
                    <View style={[styles.colorLimitModal, { height: this.state.height * 1/200, width: this.state.width * 8/9 }]}/>
                    <Text style= {styles.modalDescriptionTitleText}>{"\n"}Description</Text>
                    <Text style= {styles.modalDescriptionReductionText}>{this.state.descriptionModal}{"\n \n"}</Text>
                    <Text style= {styles.modalDescriptionTitleText}>{"\n"}Date début :</Text>
                    <Text style= {styles.modalDescriptionReductionText}>{this.state.dateDebut}{"\n \n"}</Text>
                    <Text style= {styles.modalDescriptionTitleText}>{"\n"}Date Fin :</Text>
                    <Text style= {styles.modalDescriptionReductionText}>{this.state.dateFin}{"\n \n"}</Text>
                    <Text style= {styles.modalDescriptionTitleText}>{"\n"}Cible :</Text>
                    <Text style= {styles.modalDescriptionReductionText}>{this.state.cible}{"\n \n"}</Text>
                  <View style = {styles.modalButtons}>
                    <TouchableOpacity onPress={() => this.closeModal()}>
                        <Text style={{color:'grey'}}> RETOUR </Text>
                    </TouchableOpacity>
                  </View>
                  <Text></Text>
                </ScrollView>
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
