import React, { Component } from 'react';
import { Text, StyleSheet, Modal, View, Dimensions, ScrollView, TouchableOpacity} from 'react-native';


class EventRenderInList extends Component {

  constructor(props){
    super(props)
    this.conditionDate = EventRenderInList.currentDate == this.props.intDate;
    if(!this.conditionDate)
      EventRenderInList.currentDate = this.props.intDate;
    this.state = {
      modalVisible: false,
      firstElement: false,
      itemModal: null,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }
  }
  openModal(){
    this.setState({modalVisible: true});
  }

  closeModal(){
    this.setState({modalVisible: false});
  }

  render() {
    if(this.conditionDate){//on affiche pas la date
      return (
        <View style={styles.main}>
          <View style={{height: 1, backgroundColor: '#808080'}}/>
          <View style={styles.eventLine}>
         <Text style={styles.horaireBox}>
            {this.props.heureD}:{this.props.minuteD}  {this.props.heureF}:{this.props.minuteF}
          </Text>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.eventBox} button onPress = {() => {this.openModal();}}>
            {this.props.nomEvent}
          </Text>
          </View>
          <Modal
            visible={this.state.modalVisible}
            animationType={'fade'}
            onRequestClose={() => this.closeModal()}
            transparent={true}>
            <View style = {styles.modalBackground}>
              <View style={styles.modalContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewModal}>
                  <View style={styles.modalEventNameBox}>
                    <Text style={styles.modalEventNameText}>{this.props.nomEvent} {"\n \n"}</Text>
                  </View>
                  <Text style={styles.modalEventHours}>{this.props.heureD}:{this.props.minuteD} - {this.props.heureF}:{this.props.minuteF} {"\n"}</Text>
                  <Text style={styles.modalEventDescription}>{this.props.description} {"\n \n \n \n "}</Text>
                  <View style={styles.buttonsModal}>
                    <TouchableOpacity onPress={() => this.closeModal()}>
                      <Text style={{color:'grey'}}> RETOUR AU CALENDRIER COMMUN </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      )
    }else{ //si c'est une nouvelle date, on ajoute la date
      return (
        <View style={styles.main}>
        <View style={{height: 1, backgroundColor: '#808080'}}/>
        <View style={styles.row}>
         <View style={styles.dateBox}>
          <Text style={styles.dateText}>
            {this.props.dateStylee}
            {"\n"}
          </Text>
         </View>
         <View style={{height: 1, backgroundColor: '#808080'}}/>
         <View style={styles.eventLine}>
         <Text style={styles.horaireBox}>
            {this.props.heureD}:{this.props.minuteD}  {this.props.heureF}:{this.props.minuteF}
          </Text>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.eventBox} button onPress = {() => {this.openModal(this.props);}}>
            {this.props.nomEvent}
          </Text>
          </View>
        </View>
          <Modal
            visible={this.state.modalVisible}
            animationType={'fade'}
            onRequestClose={() => this.closeModal()}
            transparent={true}>
            <View style = {styles.modalBackground}>
              <View style={styles.modalContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewModal}>
                  <View style={styles.modalEventNameBox}>
                    <Text style={styles.modalEventNameText}>{this.props.nomEvent} {"\n \n"}</Text>
                  </View>
                  <Text style={styles.modalEventHours}>{this.props.heureD}:{this.props.minuteD} - {this.props.heureF}:{this.props.minuteF} {"\n"}</Text>
                  <Text style={styles.modalEventDescription}>{this.props.description} {"\n \n \n \n "}</Text>
                  <View style={styles.buttonsModal}>
                    <TouchableOpacity onPress={() => this.closeModal()}>
                      <Text style={{color:'grey'}}> RETOUR AU CALENDRIER COMMUN </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      )
    }
  }
}


const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
  eventLine: {//container pour horaires et nomEvent dans la page principale
    flexDirection: 'row',
    flex: 1,
  },
  horaireBox: {//container pour les horaires de l'event dans la page principale
    flex: 0.15,
    fontSize: 14,
    fontWeight: '100',
    textAlign: 'left',
    textAlignVertical: "center",
    color: '#333',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  eventBox: { //container pour nomEvent dans la page principale
    flex: 0.85,
    fontSize: 22,
    fontWeight: '100',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    marginRight: 20,
    marginTop: 10,
    marginLeft:10,
    marginBottom: 10,
    backgroundColor: "#333",
  },
  dateBox: { //ligne jaune sur toute la largeur contenant la date
    flexDirection: 'row',
    backgroundColor: "#f7bd13",
    flex: 1,
  },
  dateText: { //texte de la date
    flex: 1,
    fontSize: 20,
    fontWeight: '200',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: '#9f4210',
    margin: 24,
  },
  modalBackground: {//fond transparent lorsqu'on appelle modal
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100,100,100,0.5)',
  },
  modalContainer: {//container du modal
    backgroundColor: '#0f0f0f',
    height: Dimensions.get('window').height*8/9,
    width: Dimensions.get('window').width*8/9,
    alignItems: 'center',
  },
  scrollViewModal: {//permet de scroller le modal
    alignItems: 'center',
  },
  buttonsModal: {//bouton en bas du modal
//    color: 'grey',
  },
  modalEventNameBox: {
    backgroundColor: '#f7bd13',
    width: Dimensions.get('window').width*8/9,
  },
  modalEventNameText: {//ligne nom de l'event du modal
    fontWeight: '400',
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
    marginTop: 25,
  },
  modalEventHours: {//ligne horaires du modal
    color: 'white',
    fontSize: 32,
    fontWeight: '600',
  },
  modalEventDescription: {//ligne description du modal
    color: 'white',
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'justify',
  }
});

export default EventRenderInList;
