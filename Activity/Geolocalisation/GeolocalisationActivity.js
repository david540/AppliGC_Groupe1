import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Modal, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation'; // 1.3.0
import MapView from 'react-native-maps'; // 0.20.1
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getPartenariats } from '../Partenariats/DataLoader';
import { getPointsDinterets } from '../Partenariats/DataLoader';
/*
 * Exemple de 2ème activité
 */
export default class GeolocalisationActivity extends React.Component {
  constructor(props){
    super(props);
    const navParams = this.props.navigation.state.params;
    const partenaires = getPartenariats(() => {});
    const pointsDinterets = getPointsDinterets();
    const listePoints = [];
    for(var i = 0; i < partenaires.length; i++){
      listePoints.push(partenaires[i]);
    }
    for(var i = 0; i < pointsDinterets.length; i++){
      listePoints.push(pointsDinterets[i]);
    }
    this.state = {
        navigation: props.navigation,
        partenaires: listePoints,
        idPartenaireChoisi: navParams === undefined ? -1:navParams.id,
        latitude: navParams === undefined ? 45.1878009:navParams.latitude,
        longitude: navParams === undefined ? 5.7473533:navParams.longitude,
        partenaire_act: navParams === undefined ? listePoints[0]: navParams,
        varMarginTop: 1,
        myLatitude: 0,
        myLongitude: 0,
        latitudeDelta: navParams === undefined ? 0.1: 0.007,
        longitudeDelta: navParams === undefined ? 0.1: 0.007,
        modalVisible: false,
        error: null,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - getStatusBarHeight(),
    }
  }

  marker_act = null;

  ori_change = () => {
      this.setState({
        width: Dimensions.get('window').width, height: Dimensions.get('window').height - getStatusBarHeight()
      });
  }

  componentWillMount() {
    Dimensions.addEventListener("change", this.ori_change);
  }

  refreshMap = () => {
    this.setState({varMarginTop: 1-this.state.varMarginTop});
    if(this.marker_act != null){
      this.marker_act.showCallout();
    }
  }

  componentWillUnmount() {
    //navigator.geolocation.clearWatch(this.watchId);
    Dimensions.removeEventListener("change", this.ori_change);
  }

  openModal(partenaire){
    this.setState({partenaire_act: partenaire, modalVisible: true});
  }
  closeModal(){
    this.setState({modalVisible: false});
  }

	render() {
    return (
      <View style={[styles.container, {marginTop: this.state.varMarginTop}]}>
        <View style = {{width: this.state.width, height: this.state.height/9, flexDirection: 'row', backgroundColor: '#263238', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'white', fontWeight: 'bold', fontSize: 24}}>MAPS</Text>
          <View style = {{marginLeft: 140}}>
            <TouchableOpacity onPress={() => { resetToScreen(this.state.navigation, "MainActivity") }}>
              <Text style = {{color:'white'}}>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.colorLimit, { height: this.state.height*1/80, width: this.state.width }]}/>
        <MapView style={[styles.map, {top: this.state.height/9 + this.state.height/80}]}
          provider="google"
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          followsUserLocation={true}
          loadingEnabled={true}
          toolbarEnabled={true}
          zoomEnabled={true}
          rotateEnabled={true}
          onMapReady = {() => this.refreshMap()}
          initialRegion={{
             latitude: this.state.latitude,
             longitude: this.state.longitude,
             latitudeDelta: this.state.latitudeDelta,
             longitudeDelta: this.state.longitudeDelta,
          }}
        >
        {this.state.partenaires.map(partenaire => {
          if(partenaire.id == this.state.idPartenaireChoisi){
            return (
              <MapView.Marker
                key={partenaire.id}
                ref={marker => (this.marker_act = marker)}
                coordinate={{longitude: partenaire.longitude, latitude: partenaire.latitude}}
                title={partenaire.name}
                description={partenaire.description}
                pinColor={partenaire.category == 0 ? 'green':'red'}
          	    onCalloutPress={() => {
                    this.openModal(partenaire);
                  }
                }
              />
            )
          }else{
            return (
              <MapView.Marker
                key={partenaire.id}
                onPress= {() => this.setState({varMarginTop: 1-this.state.varMarginTop})}
                coordinate={{longitude: partenaire.longitude, latitude: partenaire.latitude}}
                title={partenaire.name}
                description={partenaire.description}
                pinColor={partenaire.category == 0 ? 'green':'red'}
                onCalloutPress={() => {
                    this.openModal(partenaire);
                  }
                }
              />
            )
          }
        }
        )}
        </MapView>

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
                <Text style={styles.modalTitleText}>{this.state.partenaire_act.name}</Text>
              </View>
              <View style={[styles.colorLimitModal, { height: this.state.height * 1/200, width: this.state.width * 8/9 }]}>
              </View>
              <Image source={{uri: this.state.partenaire_act.photo}}
               style={{width: this.state.width*5/7, height: this.state.height*2/7,
               resizeMode: Image.resizeMode.contain }} />
                <Text style= {styles.modalDescriptionTitleText}>{"\n"}Description</Text>
                <Text style= {styles.modalDescriptionReductionText}>{this.state.partenaire_act.description_longue}{"\n \n"}</Text>
                {this.state.partenaire_act.category > 0 ?
                  (
                    <View style={{width:this.state.width*8/9, alignItems: 'center'}}>
                      <Text style= {styles.modalReductionTitleText}>Réduction CVA</Text>
                      <Text style= {styles.modalDescriptionReductionText}>{this.state.partenaire_act.reductions}{"\n \n"}</Text>
                    </View>
                  )
                :
                  (
                    <View/>
                  )
                }
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
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f'
  },
	map: {
		position: 'absolute',
		left: 0,
    bottom: 0,
		right: 0
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
