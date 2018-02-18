import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Button, Alert, FlatList, Picker, RefreshControl, Modal, Image} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { getPartenariats } from './DataLoader';
import { Constants } from 'expo';
import { PartenariatObject } from './PartenariatObject';
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
        urlImageModal: 'https://blog.sqlauthority.com/i/a/errorstop.png',
    }
  }

  refreshData(categoryid) {
    this.setState({ refreshing: true });
    this.state.partenaires = getPartenariats(categoryid);
    this.setState({ partenaires: partenaires, refreshing: false });
  }

  openModal(item){
    this.setState({descriptionModal: item.description_longue, reductionsModal: item.reductions, urlImageModal: item.photo, titleModal: item.name, modalVisible: true});
  }
  closeModal(){
    this.setState({modalVisible: false});
  }

	_onPressLearnMore(){
		Alert.alert('TODO');
	}

	render() {
		//_MainActivity()
    navigation = this.state.navigation;
    FlatListItemSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#607D8B",
          }}
        />
      );
    }
    var _width = Dimensions.get('window').width; //full width
    var _height = Dimensions.get('window').height; //full height
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
        <View style = {{width: _width, height: _height/9, flexDirection: 'row', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'white'}}>Partenariats</Text>
          <View style = {{marginLeft: 20}}>
            <Button
              onPress={() => { resetToScreen(navigation, "MainActivity")}}
              title = "Retour"
              color = "grey"
            />
          </View>
        </View>
        <Picker
          selectedValue={this.state.category}
          onValueChange={(itemValue, itemIndex) => {this.setState({category: itemValue, partenaires: getPartenariats(itemValue)})}}>
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
          <View style={styles.modalContainer}>
            <View style= {{backgroundColor:'white', height: _height*6/7, width: _width*6/7, alignItems: 'center'}}>
              <ScrollView contentContainerStyle={{alignItems: 'center', marginLeft: 20, marginRight: 20 }}>
                <Text style={{fontSize:24, fontWeight: 'bold', color:'red', textDecorationLine: 'underline'}}>{this.state.titleModal}</Text>
                <Image source={{uri: this.state.urlImageModal}}
                 style={{width: _width < _height ? _width*5/7 : _height*5/7, height: _width < _height ? _width*5/7 : _height*5/7,
                 resizeMode: Image.resizeMode.contain }} />
                <Text style= {{fontWeight: 'bold', textDecorationLine: 'underline'}}>Description</Text>
                <Text style= {{textAlign: 'justify'}}>{this.state.descriptionModal}</Text>
                <Text></Text>
                <Text style= {{fontWeight: 'bold', textDecorationLine: 'underline'}}>Réductions</Text>
                <Text style= {{textAlign: 'justify'}}>{this.state.reductionsModal}</Text>
                <Text></Text>
                <Button
                    onPress={() => this.closeModal()}
                    title="Retour"
                />
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
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
	centered_text: {
		alignSelf: 'stretch',
		textAlign: 'center',
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
function goToScreen(navigation,screen,params=null){
	var options = { routeName: screen };

	if (params){
		options['params'] = params;
	}
	const action = NavigationActions.navigate(options);

	navigation.dispatch(action);
}
