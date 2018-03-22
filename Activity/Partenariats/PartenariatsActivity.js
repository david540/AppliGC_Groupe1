import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Alert, FlatList, Picker, Modal, Image, TouchableOpacity} from 'react-native';
import { List, ListItem } from 'react-native-elements'; // Version can be specified in package.json
import { NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import { getPartenariats } from './DataLoader';
import { PartenariatObject } from './PartenariatObject'; // Version can be specified in package.json
/*
 * Exemple de 2ème activité
 */
export default class PartenariatsActivity extends React.Component {

  constructor(props){
    super(props);

    this.state = {
        navigation: props.navigation,
        category: PartenariatObject.ALL,
        partenaires: getPartenariats(PartenariatObject.ALL),
        modalVisible: false,
        titleModal: '404 not found',
        descriptionModal: '404 not found',
        reductionsModal: '404 not found',
        itemModal: null,
        urlImageModal: 'https://blog.sqlauthority.com/i/a/errorstop.png',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
  }
  ori_change = () => {
      this.setState({
        width: Dimensions.get('window').width, height: Dimensions.get('window').height
      });
  }

  componentWillMount() {
    Dimensions.addEventListener("change", this.ori_change);
  }

  componentWillUnmount() {
    // Important to stop updating state after unmount
    Dimensions.removeEventListener("change", this.ori_change);
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
		//_MainActivity()
    var navigation = this.state.navigation;

  /*  const partenaires = [
        {
        name: 'Amy',
        subtitle: 'Fille'
      },
        {
        name: 'Sam',
        subtitle: 'Gars'
        }

    ];*/
  //  [Tous,Restauration,Bar,Ski,Magasin,Loisirs,Autres]
  /*  Alert.alert(
      item.name,
      item.description_longue,
      [{text: 'Map', onPress: () => goToScreen(navigation, "GeolocalisationActivity", item)},
      {text: 'OK', onPress: () => console.log('OK Pressed')}])*/
    return (
      <View style={styles.container}>
        <View style = {{width: this.state.width, height: this.state.height/9, flexDirection: 'row', backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'white', fontWeight: 'bold', fontSize: 18, marginTop: 30}}>PARTENARIATS CVA</Text>
          <View style = {{marginLeft: 80}}>
            <TouchableOpacity onPress={() => { resetToScreen(this.state.navigation, "MainActivity") }}>
              <Text style = {{color:'white', marginTop: 30}}>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.colorLimit}>
        </View>
        <Picker
          selectedValue={this.state.category}
          onValueChange={(itemValue) => {this.setState({category: itemValue, partenaires: getPartenariats(itemValue)})}}>
          <Picker.Item label={PartenariatObject.CATEGORIES_NAME[PartenariatObject.ALL]} value={PartenariatObject.ALL} />
          <Picker.Item label={PartenariatObject.CATEGORIES_NAME[PartenariatObject.RESTAURATION]} value={PartenariatObject.RESTAURATION} />
          <Picker.Item label={PartenariatObject.CATEGORIES_NAME[PartenariatObject.BAR]} value={PartenariatObject.BAR} />
          <Picker.Item label={PartenariatObject.CATEGORIES_NAME[PartenariatObject.SKI]} value={PartenariatObject.SKI} />
          <Picker.Item label={PartenariatObject.CATEGORIES_NAME[PartenariatObject.MAGASIN]} value={PartenariatObject.MAGASIN} />
          <Picker.Item label={PartenariatObject.CATEGORIES_NAME[PartenariatObject.LOISIRS]} value={PartenariatObject.LOISIRS} />
          <Picker.Item label={PartenariatObject.CATEGORIES_NAME[PartenariatObject.AUTRES]} value={PartenariatObject.AUTRES} />
        </Picker>
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
              badge={{ value: PartenariatObject.CATEGORIES_NAME[item.category]}}
            />
          )}
          keyExtractor= {item => item.id}
          />
        </List>
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
                  <Text style={styles.modalTitleText}>{this.state.titleModal}</Text>
                </View>
                <View style={styles.colorLimitModal}>
                </View>
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
      </View>
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
    height: Dimensions.get('window').height*1/80,
    width: Dimensions.get('window').width,
  },
  colorLimitModal: { //limitation black
    backgroundColor: '#0f0f0f',
    height: Dimensions.get('window').height*1/200,
    width: Dimensions.get('window').width*8/9,
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
    height: Dimensions.get('window').height*8/9,
    width: Dimensions.get('window').width*8/9,
    alignItems: 'center',
  },
  scrollViewModalContainer: {
    alignItems: 'center',
  },
  modalTitleBox: {
    backgroundColor: "#f7bd13",
    width: Dimensions.get('window').width*8/9,
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
function goToScreen(navigation,screen,params=null){
	var options = { routeName: screen };

	if (params){
		options['params'] = params;
	}
	const action = NavigationActions.navigate(options);

	navigation.dispatch(action);
}
