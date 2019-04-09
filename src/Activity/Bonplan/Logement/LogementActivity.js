import React from 'react';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View, ScrollView, Dimensions, Alert, ActivityIndicator, FlatList, Picker, Modal, Image, TouchableOpacity} from 'react-native';
import { List, ListItem } from 'react-native-elements'; // Version can be specified in package.json
import { LogementObject } from'./LogementObject';
import { getLogement, logementsAreLoaded } from './DataLoader';
import { getPartenariats, partenairesAreLoaded } from '../../Partenariats/DataLoader';
import { PartenariatObject } from '../../Partenariats/PartenariatObject'; // Version can be specified in package.json

import { resetToScreen, goToScreen } from '../../MainActivity';

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
  ori_change = () => {
      this.setState({
        width: Dimensions.get('window').width, height: Dimensions.get('window').height - getStatusBarHeight()
      });
  }

  componentWillMount() {
    Dimensions.addEventListener("change", this.ori_change);
  }

  componentWillUnmount() {
    // Important to stop updating state after unmount
    Dimensions.removeEventListener("change", this.ori_change);
  }
  componentDidMount(){
    this.setState({partenaires:getPartenariats(() => this.setState({loadisnotdone: false}), PartenariatObject.ALL)});
  }
  refreshData(categoryid) {
    this.setState({ refreshing: true });
    this.setState({partenaires : getPartenariats(categoryid), refreshing: false});
  }

  openModal(item){
    this.setState({itemModal: item, descriptionModal: item.description_longue, reductionsModal: item.reductions, urlImageModal: item.photo, titleModal: item.name, modalVisible: true});
  }
  closeModal(){
    this.setState({modalVisible: false});
  }

	_onPressLearnMore(){
		Alert.alert('TODO');
	}




    render() {

    var navigation = this.state.navigation;

        return(
            this.state.loadisnotdone ?
            (
                <View style={{justifyContent: 'center', alignItems: 'center', height:this.state.height, width:this.state.width}}>
                    <Text>Chargement des informations : Logements</Text>
                    <Text>Vérifiez que vous êtes connecté à internet</Text>
                    <ActivityIndicator/>
                </View>
            ) :
            (
                <View style={styles.container}>
                    <View style = {{width: this.state.width, height: this.state.height/9, flexDirection: 'row', backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color:'white', fontWeight: 'bold', fontSize: 18}}>LOGEMENTS</Text>
                        <View style = {{marginLeft: 80}}>
                            <TouchableOpacity onPress={() => { goToScreen(this.state.navigation, "BonplanActivity") }}>
                                <Text style = {{color:'white'}}>Consulter mes offres</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.colorLimit, { height: this.state.height*1/80, width: this.state.width }]}/>
                    <View style={{height: this.state.height*1/18}}>
                        <Picker
                          selectedValue={this.state.category}
                          onValueChange={(itemValue) => {this.setState({category: itemValue, itemValue})}}>
                            <Picker.Item label={LogementObject.CATEGORIES_NAME[LogementObject.ALL]} value={LogementObject.ALL} />
                            <Picker.Item label={LogementObject.CATEGORIES_NAME[LogementObject.OUEST]} value={LogementObject.OUEST} />
                            <Picker.Item label={LogementObject.CATEGORIES_NAME[LogementObject.CENTRE]} value={LogementObject.CENTRE} />
                            <Picker.Item label={LogementObject.CATEGORIES_NAME[LogementObject.EST]} value={LogementObject.EST} />
                            <Picker.Item label={LogementObject.CATEGORIES_NAME[LogementObject.HYPERCENTRE]} value={LogementObject.HYPERCENTRE} />
                            <Picker.Item label={LogementObject.CATEGORIES_NAME[LogementObject.PRESQUILE]} value={LogementObject.PRESQUILE} />
                            <Picker.Item label={LogementObject.CATEGORIES_NAME[LogementObject.GARE]} value={LogementObject.GARE} />
                            <Picker.Item label={LogementObject.CATEGORIES_NAME[LogementObject.ILEVERTE]} value={LogementObject.ILEVERTE} />
                            <Picker.Item label={LogementObject.CATEGORIES_NAME[LogementObject.SMH]} value={LogementObject.SMH} />
                        </Picker>
                    </View>

                    <View style={{height:this.state.height*(1 - 1/9 - 1/13 - 1/18 - 1/80)}}>
                        <List>
                            <FlatList
                            data={this.state.partenaires}
                            renderItem={({item}) => (
                              <ListItem
                                button onPress={() => {
                                  this.openModal(item);
                                }}
                                roundAvatar
                                avatar={{uri:item.photo}}
                                title={item.name}
                                subtitle={item.description}
                                badge={{ value: LogementObject.CATEGORIES_NAME[item.category]}}
                              />
                            )}
                            keyExtractor= {item => item.id}
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
                            <Image source={{uri: this.state.urlImageModal}}
                             style={{width: this.state.width*5/7, height: this.state.height*2/7,
                             resizeMode: Image.resizeMode.contain }} />
                              <Text style= {styles.modalDescriptionTitleText}>{"\n"}Description</Text>
                              <Text style= {styles.modalDescriptionReductionText}>{this.state.descriptionModal}{"\n \n"}</Text>
                             <Text style= {styles.modalReductionTitleText}>Réduction CVA</Text>
                             <Text style= {styles.modalDescriptionReductionText}>{this.state.reductionsModal}{"\n \n"}</Text>
                            <View style = {styles.modalButtons}>
                              <TouchableOpacity onPress={() => this.closeModal()}>
                                  <Text style={{color:'grey'}}> RETOUR </Text>
                              </TouchableOpacity>
                              <View style={{marginLeft: 60}}>
                                <TouchableOpacity onPress={() => {goToScreen(navigation, "GeolocalisationActivity", this.state.itemModal); this.closeModal();}}>
                                    <Text style={{color:'grey'}}> MAP </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                            <Text></Text>
                          </ScrollView>
                        </View>
                      </View>
                    </Modal>
                    <View style={styles.container}>
                        <View style = {{width: this.state.width, height: this.state.height/13, flexDirection: 'row', backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => { goToScreen(this.state.navigation, "FormulaireLogementActivity") }}>
                                <Text style={{color:'white', fontSize: 20}}>Proposer un logement</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            )
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  colorLimit: {
    backgroundColor: '#f7bd13',
  },
  colorLimitModal: { //limitation black
    backgroundColor: '#0f0f0f',
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
  scrollViewModalContainer: {
    alignItems: 'center',
  },
  modalTitleBox: {
    backgroundColor: "#f7bd13",
  },
  modalTitleText: {
    fontSize:30,
    fontWeight: '400',
    color:'white',
    textAlign: 'center',
  },
  modalDescriptionTitleText: {
    fontWeight: '200',
    fontSize: 24,
  },
  modalDescriptionReductionText: {
    textAlign: 'justify',
    marginLeft: 20,
    marginRight: 20,
  },
  modalReductionTitleText: {
    fontWeight: '200',
    fontSize: 24,
  },
  modalButtons: {
    flex: 1,
    flexDirection: 'row',
  },
});


