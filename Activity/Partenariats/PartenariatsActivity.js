import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert, FlatList, Picker, RefreshControl} from 'react-native';
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
    }
  }

  refreshData(categoryid) {
    this.setState({ refreshing: true });
    const partenaires = getPartenariats(categoryid);
    this.setState({ partenaires: partenaires, refreshing: false })
  }

	_onPressLearnMore(){
		Alert.alert('TODO')
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
          <Picker.Item label={PartenariatObject.CATEGORIES_NAME[PartenariatObject.BAR]} value={PartenariatObject.BAR} />
          <Picker.Item label={PartenariatObject.CATEGORIES_NAME[PartenariatObject.BOITE]} value={PartenariatObject.BOITE} />
          <Picker.Item label={PartenariatObject.CATEGORIES_NAME[PartenariatObject.FASTFOOD]} value={PartenariatObject.FASTFOOD} />
          <Picker.Item label={PartenariatObject.CATEGORIES_NAME[PartenariatObject.CAFE]} value={PartenariatObject.CAFE} />
          <Picker.Item label={PartenariatObject.CATEGORIES_NAME[PartenariatObject.RESTAURANT]} value={PartenariatObject.RESTAURANT} />
          <Picker.Item label={PartenariatObject.CATEGORIES_NAME[PartenariatObject.MAGASIN]} value={PartenariatObject.MAGASIN} />
        </Picker>
        <List>
          <FlatList
          data={this.state.partenaires}
          renderItem={({item}) => (
            <ListItem
              roundAvatar
              avatar={require('./photo.png')}
              title={item.name}
              subtitle={item.description}
              badge={{ value: PartenariatObject.CATEGORIES_NAME[item.category]}}
            />
          )}
          keyExtractor= {item => item.name}
          />
        </List>
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
