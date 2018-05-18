import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert, Animated } from 'react-native'; // Version can be specified in package.json
import { NavigationActions } from 'react-navigation';

/*
 * Exemple de 2ème activité
 */
export default class CarteActivity extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        navigation: props.navigation,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }

    this.animatedValue = new Animated.Value(0);
  }
  ori_change = () => {
      this.setState({
        width: Dimensions.get('window').width, height: Dimensions.get('window').height
      });
  }

  componentDidMount() {
    this.animateBackgroundColor();
    }

  componentWillMount() {
    Dimensions.addEventListener("change", this.ori_change);
  }

  componentWillUnmount() {
    // Important to stop updating state after unmount
    Dimensions.removeEventListener("change", this.ori_change);
  }

  animateBackgroundColor = () => {
    this.animatedValue.setValue(0);
    Animated.timing(
        this.animatedValue, {
            toValue: 1,
            duration: 12000
        }
    ).start(() => { this.animateBackgroundColor() });
    }

	render() {
		//_MainActivity()
    //const { params } = this.props.navigation.state;
    const params = {num_cva: 1, nom: "Dupont", prenom: "Jean", ecole: "Ense3"};
    const backgroundColorVar = this.animatedValue.interpolate(
    {
        inputRange: [ 0, 0.2, 0.4, 0.6, 0.8, 1 ],
        outputRange: [ '#004B9B', '#0096D7','#6EA023','#F09600', '#BE141E', '#96147D' ]
        //            bleu foncé    vert     violet     bleu ciel     orange    rouge

    });
    return (
      <View style={styles.container}>
        <View style = {{width: this.state.width, height: this.state.height/9, flexDirection: 'row', backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'white', fontWeight: 'bold', fontSize: 18, marginTop: this.state.height/50}}>CVA</Text>
          <View style = {{marginLeft: 80}}>
            <TouchableOpacity onPress={() => { resetToScreen(this.state.navigation, "MainActivity") }}>
              <Text style = {{color:'white', marginTop: this.state.height/50}}>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.colorLimit, { height: this.state.height*1/80, width: this.state.width }]}/>
        <Animated.View style={{width:this.state.width,height:this.state.height*(1 - 1/9 - 1/80), justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColorVar, flex:0.18}}></Animated.View>
          <View style={styles.card}>
            <View style={styles.cardTitle}>
              <Text style={styles.vertText}>CVA</Text>
            </View>
            <View style={styles.cardInfo}>
              <View style={styles.cardInfoTitle}>
              <Animated.Text style={(styles.cardInfoTitleText, {color: backgroundColorVar})}>ANNEE 2018-2019</Animated.Text>
              </View>
              <View style={styles.cardInfoDesc}>
                <View style={{flex:0.5, justifyContent: 'center'}}>
                  <Text style={styles.cardInfoDescText}>N° : {params.num_cva}{"\n"}</Text>
                  <Text style={styles.cardInfoDescText}>{params.ecole}</Text>
                </View>
                <View style={{flex:0.5, justifyContent: 'center'}}>
                  <Text style={styles.cardInfoDescText}>{params.nom}{"\n"}</Text>
                  <Text style={styles.cardInfoDescText}>{params.prenom}</Text>
               </View>
              </View>
            </View>
          </View>
        <Animated.View style={{width:this.state.width,height:this.state.height*(1 - 1/9 - 1/80), justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColorVar, flex:0.42}}></Animated.View>
      </View>
    );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  colorLimit: {
    backgroundColor: '#f7bd13',
  },
  card: {
    backgroundColor: "black",
    flex: 0.4,
    flexDirection: 'row'
  },
  cardTitle: {
    flexDirection: 'row',
    flex:0.15,
    backgroundColor: "#e0e0e0",
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flexDirection: 'column',
    flex: 0.85
  },
  vertText: {
    fontWeight: '800',
    flexDirection: 'column',
    transform: [{rotate: '270deg'}],
    fontSize: 27,
    textAlign: 'center',
    color: 'white',
    ///backgroundColor: 'blue',
  },
  cardInfoTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 0.4,
  },
  cardInfoTitleText: {
    color: '#e0e0e0',
    fontSize: 20,
    fontWeight:'800',
  },
  cardInfoDesc: {
    flexDirection: 'row',
    flex: 0.6,
  },
  cardInfoDescText: {
    color: '#e0e0e0',
    textAlign: 'center',
    fontSize: 16,
    fontWeight:'400',
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
