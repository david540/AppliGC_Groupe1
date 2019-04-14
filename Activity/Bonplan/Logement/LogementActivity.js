import React from 'react';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View, ScrollView, Dimensions, Alert, ActivityIndicator, FlatList, Picker, Modal, Image, TouchableOpacity} from 'react-native';
import { List, ListItem } from 'react-native-elements'; // Version can be specified in package.json
import { LogementObject } from'./LogementObject';
import { getLogements, logementsAreLoaded } from './DataLoader';
import { getPartenariats, partenairesAreLoaded } from '../../Partenariats/DataLoader';
import { PartenariatObject } from '../../Partenariats/PartenariatObject'; // Version can be specified in package.json

import { resetToScreen, goToScreen } from '../../MainActivity';
import { styles } from '../../Styles';

export default class LogementActivity extends React.Component {

  	constructor(props){
    		super(props);
     this.state = {
        navigation: props.navigation,
        category: LogementObject.ALL,
        logements: [],
        modalVisible: false,
        titleModal: '404 not found',
        descriptionModal: '404 not found',
        adresseModal: '404 not found',
        itemModal: null,
        surfaceModal: '404 not found',
        prixModal: '404 not found',
        typeModal: '404 not found',
        placesModal: '404 not found',
        urlImageModal: 'https://blog.sqlauthority.com/i/a/errorstop.png',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - getStatusBarHeight(),
        loadisnotdone: !logementsAreLoaded()
    };
    //this.refreshData(this.state.category);
  }

  ori_change = () => {
      this.setState({
        width: Dimensions.get('window').width, height: Dimensions.get('window').height - getStatusBarHeight()
      });
  }

  /*
  componentWillMount() {
    Dimensions.addEventListener("change", this.ori_change);
  }

  componentWillUnmount() {
    // Important to stop updating state after unmount
    Dimensions.removeEventListener("change", this.ori_change);
  }
  componentDidMount(){
    this.setState({logements: getLogements(() => this.setState({loadisnotdone: false}), LogementObject.ALL)});
  }
  refreshData(categoryid) {
    this.setState({ refreshing: true });
    this.setState({logements : getLogements(categoryid), refreshing: false});
  }

*/
  openModal(item){
    this.setState({itemModal: item, descriptionModal: item.description, adresseModal: item.getAdresse(), surfaceModal: item.surface, prixModal: item.prix, typeModal: item.type, placesModal: item.places, modalVisible: true});
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
            !this.state.loadisnotdone ?
            (
                <View style={styles.loading_screen}>
                    <Text>Chargement des informations : Logements</Text>
                    <Text>Vérifiez que vous êtes connecté à internet</Text>
                    <ActivityIndicator/>
                </View>
            ) :
            (
                <View style={styles.main_container}>
                    <View style = {styles.top_banner}>
                        <View style = {styles.top_left_banner}>
                            <Text style={[styles.text_neutral, styles.page_title_left]}>LOGEMENTS</Text>
                        </View>
                        <View style = {styles.top_right_banner}>
                            <TouchableOpacity onPress={() => { goToScreen(this.state.navigation, "BonplanActivity") }}>
                                <Text style = {[styles.text_neutral, styles.top_right_text]}>Consulter mes offres</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.yellow_strip}/>
                    <View style={styles.picker_box}>
                        <Picker
                          selectedValue={this.state.category}
                          onValueChange={(itemValue) => {this.setState({category: itemValue, logements: getLogements(() =>{}, itemValue)})}}>
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

                    <View style={styles.list_box}>
                        <List>
                            <FlatList
                            data={this.state.logements}
                            renderItem={({item}) => (
                              <ListItem
                                button onPress={() => {
                                  this.openModal(item);
                                }}
                                roundAvatar
                                avatar={{uri:item.photo}}
                                title={item.getTitre()}
                                subtitle={item.getAdresse()}
                                badge={{ value: LogementObject.CATEGORIES_NAME[item.category]}}
                              />
                            )}
                            keyExtractor= {item => item.getId()}
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
                        <View style= {styles.modalContainer}>
                          <ScrollView contentContainerStyle={styles.scrollViewModalContainer}>
                            <View style={styles.modalTitleBox}>
                                <Text style={[styles.text_neutral, styles.modalTitleText]}>{this.state.adresseModal}</Text>
                            </View>
                            <View style={styles.colorLimitModal}/>
                            <Image source={{uri: this.state.urlImageModal}}
                              style={{width: this.state.width*5/7, height: this.state.height*2/7,
                              resizeMode: Image.resizeMode.contain }} />
                            <View style={styles.modalButtons}>
                                <Text style={[styles.text_neutral, styles.modalDescriptionLeft]}>Type: {this.state.typeModal}</Text>
                                <Text style={[styles.text_neutral, styles.modalDescriptionRight]}>   Place(s): {this.state.placesModal}</Text>
                            </View>
                            <View style={styles.modalButtons}>
                                <Text style={[styles.text_neutral, styles.modalDescriptionLeft]}>Surface: {this.state.surfaceModal} m²</Text>
                                <Text style={[styles.text_neutral, styles.modalDescriptionRight]}>   Prix: {this.state.prixModal}€/mois</Text>
                            </View>
                            <Text style={[styles.text_neutral, styles.modalDescriptionReductionText]}>{"\n \n"}{this.state.descriptionModal}{"\n \n"}</Text>
                            <View style = {styles.modalButtons}>
                                <TouchableOpacity onPress={() => this.closeModal()}>
                                    <Text style={[styles.text_neutral, {color:'grey'}]}> RETOUR </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {goToScreen(navigation, "GeolocalisationActivity", this.state.itemModal); this.closeModal();}}>
                                    <Text style={[styles.text_neutral, {color:'grey'}]}> MAP </Text>
                                </TouchableOpacity>
                            </View>
                            <Text></Text>
                          </ScrollView>
                        </View>
                      </View>
                    </Modal>
                    <View style = {styles.bottom_button}>
                        <TouchableOpacity onPress={() => { goToScreen(this.state.navigation, "FormulaireLogementActivity") }}>
                            <Text style={[styles.text_neutral, styles.bottomContainerText]}>Proposer un logement</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        );
    }
}

