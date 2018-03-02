import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert, Modal, ScrollView, Image} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Constants } from 'expo';
import MapView from 'react-native-maps';
import { getPartenariats } from '../Partenariats/DataLoader';
/*
 * Exemple de 2ème activité
 */
export default class GeolocalisationActivity extends React.Component {

  constructor(props){
    super(props);
    const navParams = this.props.navigation.state.params;
    this.state = {
        navigation: props.navigation,
        partenaires: getPartenariats(),
        idPartenaireChoisi: navParams === undefined ? -1:navParams.id,
        latitude: navParams === undefined ? 45.1878009:navParams.getLatitude(),
        longitude: navParams === undefined ? 5.7473533:navParams.getLongitude(),
        partenaire_act: navParams === undefined ? partenaires[0]: navParams,
        myLatitude: 0,
        myLongitude: 0,
        latitudeDelta: navParams === undefined ? 0.1: 0.007,
        longitudeDelta: navParams === undefined ? 0.1: 0.007,
        modalVisible: false,
        marker_act: null,
        error: null,
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

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          myLatitude: position.coords.latitude,
          myLongitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
    Dimensions.removeEventListener("change", this.ori_change);
  }

  componentDidUpdate() {
      if(this.state.marker_act != undefined){
        this.state.marker_act.showCallout();
      }
  }

  openModal(partenaire){
    this.setState({partenaire_act: partenaire, modalVisible: true});
  }
  closeModal(){
    this.setState({modalVisible: false});
  }

	render() {
		//_MainActivity()
    navigation = this.state.navigation;
    var _width = Dimensions.get('window').width; //full width
    var _height = Dimensions.get('window').height; //full height
    return (
      <View style={styles.container}>
        <MapView style={[styles.map, {top: (Constants.statusBarHeight + _height/9)}]}
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
                ref={marker => (this.state.marker_act = marker)}
                coordinate={{longitude: partenaire.longitude, latitude: partenaire.latitude}}
                title={partenaire.name}
                description={partenaire.description}
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
                coordinate={{longitude: partenaire.longitude, latitude: partenaire.latitude}}
                title={partenaire.name}
                description={partenaire.description}
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

        <View style = {{width: _width, height: _height/9, flexDirection: 'row', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'white'}}>Geolocalisation</Text>
          <View style = {{marginLeft: 20}}>
            <Button
              onPress={() => { resetToScreen(navigation, "MainActivity")}}
              title = "Retour"
              color = "grey"
            />
          </View>
        </View>
        <Modal
            visible={this.state.modalVisible}
            animationType={'fade'}
            onRequestClose={() => this.closeModal()}
            transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style= {{backgroundColor:'white', height: _height*6/7, width: _width*6/7, alignItems: 'center'}}>
              <ScrollView contentContainerStyle={{alignItems: 'center', marginLeft: 20, marginRight: 20 }}>
                <Text style={{fontSize:24, fontWeight: 'bold', color:'red', textDecorationLine: 'underline'}}>{this.state.partenaire_act.name}</Text>
                <Image source={{uri: this.state.partenaire_act.photo}}
                 style={{width: this.state.width*5/7, height: this.state.height*2/7,
                 resizeMode: Image.resizeMode.contain }} />
                <Text style= {{fontWeight: 'bold', textDecorationLine: 'underline'}}>Description</Text>
                <Text style= {{textAlign: 'justify'}}>{this.state.partenaire_act.description_longue}</Text>
                <Text></Text>
                <Text style= {{fontWeight: 'bold', textDecorationLine: 'underline'}}>Réductions</Text>
                <Text style= {{textAlign: 'justify'}}>{this.state.partenaire_act.reductions}</Text>
                <Text></Text>
                <View style = {{flex: 1, flexDirection: 'row'}}>
                  <Button
                      onPress={() => this.closeModal()}
                      title="Retour"
                  />
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
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
	centered_text: {
		alignSelf: 'stretch',
		textAlign: 'center',
	},
	map: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		right: 0
	},
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100,100,100,0.5)',
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
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