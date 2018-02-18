import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert } from 'react-native';
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
        myLatitude: 0,
        myLongitude: 0,
        latitudeDelta: navParams === undefined ? 0.1: 0.007,
        longitudeDelta: navParams === undefined ? 0.1: 0.007,
        marker_act: null,
        error: null,
    }
  }

	_onPressLearnMore(){
		Alert.alert('TODO')
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
  }

  componentDidUpdate() {
      if(this.state.marker_act){
        this.state.marker_act.showCallout();
      }
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
            console.log("Partenaire trouvé");
            return (
              <MapView.Marker
                key={partenaire.id}
                ref={marker => (this.state.marker_act = marker)}
                coordinate={{longitude: partenaire.longitude, latitude: partenaire.latitude}}
                title={partenaire.name}
                description={partenaire.description}
          	    onCalloutPress={() => {
                  Alert.alert(
                    partenaire.name,
                    partenaire.description_longue,
                    [{text: 'OK', onPress: () => {}}])
                  }
                }
                >
              </MapView.Marker>
            )
          }else{
            return (
              <MapView.Marker
                key={partenaire.id}
                coordinate={{longitude: partenaire.longitude, latitude: partenaire.latitude}}
                title={partenaire.name}
                description={partenaire.description}
          	    onCalloutPress={() => {
                  Alert.alert(
                    partenaire.name,
                    partenaire.description_longue,
                    [{text: 'OK', onPress: () => {}}])
                  }
                }>
              </MapView.Marker>
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
	}
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
