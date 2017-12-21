import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getPartenariats } from './DataLoader'
import { PartenariatObject } from './PartenariatObject'
/*
 * Exemple de 2ème activité
 */
export default class PartenariatsActivity extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        navigation: props.navigation
    }
  }

	_onPressLearnMore(){
		Alert.alert('TODO')
	}

	render() {
		//_MainActivity()
    navigation = this.state.navigation;
    var _width = Dimensions.get('window').width; //full width
    var _height = Dimensions.get('window').height; //full height
    var partenaires = getPartenariats();
    _renderPartenaire = (({partenaire}) => <Text style={[{color:'white'}, styles.centered_text]}>
        Exemple, {partenaire}:{"\n"}
        Catégorie->{PartenariatObject.CATEGORIES_NAME[0]}{"\n"}
        Description->{partenaire}
      </Text>
    )
    return (
      <View style={{width:_width,height:_height, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFD036'}}>
        <View style = {{width: _width, height: _height/9, flexDirection: 'row', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'white'}}>Partenariats</Text>
          <View style = {{marginLeft: 20}}>
            <Button
              onPress={() => { resetToScreen(navigation, "MainActivity")}}
              title = "Retour"
              color = "#FFD036"
            />
          </View>
        </View>
        <View style={{width:_width, height:_height*0.8, justifyContent: 'center', alignItems: 'center'}}>
          <FlatList
            data={partenaires}
            renderItem={({item}) => <View backgroundColor = "#A0A0A0A0" style= {styles.container}>
              <Text style={[styles.item, {color: 'white'}]}>
                Nom -> {item.name}:{"\n"}
                Catégorie -> {PartenariatObject.CATEGORIES_NAME[item.category]}{"\n"}
                Description -> {item.description}
              </Text>
              </View>
            }
            keyExtractor= {(item) => item}
          />
        </View>
      </View>
    );
	}
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#d6d7da',
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
