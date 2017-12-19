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
        <View style={{width:_width, height:_height*0.2, justifyContent: 'center', alignItems: 'center'}}>
          <Button
            onPress={() => { resetToScreen(navigation, "MainActivity")}}
            title = "Retour"
            color = "#FFD036"
          />
          <Text style={[{color:'white'}, styles.centered_text]}>Vous voilà arrivé sur l activité des partenariats</Text>
        </View>
        <View style={{width:_width, height:_height*0.8, justifyContent: 'center', alignItems: 'center'}}>
          <FlatList
            data={partenaires}
            renderItem={({item}) => <Text style={styles.item}>
                Nom -> {item.name}:{"\n"}
                Catégorie -> {PartenariatObject.CATEGORIES_NAME[item.category]}{"\n"}
                Description -> {item.description}
              </Text>
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
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
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
