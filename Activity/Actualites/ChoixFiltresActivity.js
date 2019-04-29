import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert, AsyncStorage, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import {List, ListItem} from 'react-native-elements';
import { styles } from '../Styles'


/*
 * Exemple de 2ème activité
 */

export default class ChoixFiltresActivity extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        navigation: props.navigation,
        width: Dimensions.get('window').width * 8/9,
        height: Dimensions.get('window').height * 8/9,
        listeEcoles: this.props.listeEcoles,
        listeAssos: this.props.listeAssos,
        selectedList: this.props.choixAssos,
    }
    this.setSelectionInitiale();
  }

  setSelectionInitiale(){
    for(var i = 0; i < this.state.selectedList.length; i++){
      if(this.state.selectedList[i] < 10){
        for(var j = 0; j < this.state.listeEcoles.length; j++) {
          if(this.state.listeEcoles[j].id == this.state.selectedList[i])
            this.state.listeEcoles[j].isSelected = true;
        }
      }else{
        for(var j = 0; j < this.state.listeAssos.length; j++) {
          if(this.state.listeAssos[j].id == this.state.selectedList[i])
            this.state.listeAssos[j].isSelected = true;
        }
      }
    }
  }

  setChoixAssosInFile(){
    var chaine = "";
    for(i = 0 ; i < this.state.selectedList.length - 1; i++){
      chaine = chaine.concat(this.state.selectedList[i].toString().concat(";"));
    }
    if(this.state.selectedList.length > 0)
      chaine = chaine.concat(this.state.selectedList[this.state.selectedList.length - 1].toString());
    AsyncStorage.setItem('choixassos', chaine);
  }

  ori_change = () => {
      this.setState({
        width: Dimensions.get('window').width * 8/9, height: Dimensions.get('window').height * 8/9
      });
  }

  componentWillMount() {
    Dimensions.addEventListener("change", this.ori_change);
  }

  componentWillUnmount() {
    // Important to stop updating state after unmount
    Dimensions.removeEventListener("change", this.ori_change);
  }

  pressEcole = (hey) => {
    this.state.listeEcoles.map((item) => {
      if (item.id === hey.id) {
        item.isSelected = !item.isSelected
        if (item.isSelected === true) {
          this.state.selectedList.push(item.id.toString());
        } else if (item.isSelected === false) {
          for(var i = 0; i < this.state.selectedList.length; i++){
            if (this.state.selectedList[i] === item.id) {
              this.state.selectedList.splice(i, 1)
              console.log('unselect:' + item.givenName)
              return this.state.selectedList
            }
          }
        }
      }
    })
    this.setState({listeEcoles: this.state.listeEcoles})
  }
  pressAsso = (hey) => {
    this.state.listeAssos.map((item) => {
      if (item.id === hey.id) {
        item.isSelected = !item.isSelected
        if (item.isSelected === true) {
          this.state.selectedList.push(item.id.toString());
          console.log('selected:' + item.name);
        } else if (item.isSelected === false) {
          for(var i = 0; i < this.state.selectedList.length; i++){
            if (this.state.selectedList[i] === item.id) {
              this.state.selectedList.splice(i, 1)
              console.log('unselect:' + item.givenName)
              return this.state.selectedList
            }
          }
        }
      }
    })
    this.setState({listeAssos: this.state.listeAssos})
  }


  close(){
    //this.setChoixAssosInFile();
    this.props.closeModal();
  }


render() {
  return (
    <View style={[styles.container, {width: this.state.width, height: this.state.height}]}>
        <View style={[styles.modalTitleBox, {width: this.state.width, height: this.state.height * 1/9}]}>
          <Text style={styles.modalTitleText}>FILTRES</Text>
        </View>
        <View style={[styles.colorLimitModal, { height: this.state.height * 1/200, width: this.state.width }]}/>
        <View style={{height: this.state.height * (7/9 - 1/200), width: this.state.width}}>
          <ScrollView>
            <Text style={{alignSelf:'stretch', textAlign: 'center', marginTop:20}}>Dans quelle école es-tu ?</Text>
            <View>
              <FlatList data={this.state.listeEcoles} keyExtractor={item => item.id} extraData={this.state} ListHeaderComponent={this.renderHeader} renderItem={({item}) => {
                return <TouchableOpacity style={{
                  flexDirection: 'row',
                  padding: 10,
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#ecf0f1'
                }} onPress={() => {
                  this.pressEcole(item)
                }}>
                  <View style={{
                    flex: 3,
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                  }}>
                    {item.isSelected
                      ? (
                        <Text style={{
                          fontWeight: 'bold'
                        }}>{`${item.name}`}</Text>
                      )
                      : (
                        <Text style={{
                          color:'#808080'
                        }}>{`${item.name}`}</Text>
                      )}
                  </View>
                  <View style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                  }}>
                    {item.isSelected
                      ? (
                        <Icon name="ios-checkbox" size={30} color={primaryColor}></Icon>
                      )
                      : (
                        <Icon name="ios-square-outline" size={30} color={darkGrey}></Icon>
                      )}
                  </View>
                </TouchableOpacity>
              }}/>
            </View>
            <Text style={{alignSelf:'stretch', textAlign: 'center', marginTop:50}}>Fais tu partie d'une ou plusieurs asso(s) ?</Text>
            <View>
              <FlatList data={this.state.listeAssos} keyExtractor={item => item.id} extraData={this.state} ListHeaderComponent={this.renderHeader} renderItem={({item}) => {
                return <TouchableOpacity style={{
                  flexDirection: 'row',
                  padding: 10,
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#ecf0f1'
                }} onPress={() => {
                  this.pressAsso(item)
                }}>
                  <View style={{
                    flex: 3,
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                  }}>
                    {item.isSelected
                      ? (
                        <Text style={{
                          fontWeight: 'bold'
                        }}>{`${item.name}`}</Text>
                      )
                      : (
                        <Text style={{
                          color:'#808080'
                        }}>{`${item.name}`}</Text>
                      )}
                  </View>
                  <View style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                  }}>
                    {item.isSelected
                      ? (
                        <Icon name="ios-checkbox" size={30} color={primaryColor}></Icon>
                      )
                      : (
                        <Icon name="ios-square-outline" size={30} color={darkGrey}></Icon>
                      )}
                  </View>
                </TouchableOpacity>
              }}/>
            </View>
            </ScrollView>
          </View>
          <View style = {[styles.modalButtons, {height:this.state.height*1/9, width:this.state.width, justifyContent: 'center', alignItems: 'center'}]}>
            <TouchableOpacity  onPress={() => this.close()}>
                <Text style={{color:'grey'}}> APPLIQUER </Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

