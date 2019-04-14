import React from 'react';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { goToScreen, resetToScreen} from '../../MainActivity.js';
import { styles } from '../../Styles';

export default class StageActivity extends React.Component {

  	constructor(props){
    		super(props);
    		this.state = {
    		    navigation: props.navigation,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - getStatusBarHeight(),
                loadisnotdone: false
        }
  	}

    render() {
        return(
                <View style={styles.main_container}>
                    <View style={styles.top_banner}>
                        <View style={styles.top_left_banner}>
                            <Text style={[styles.text_neutral, styles.page_title_left]}> OFFRES DE STAGE </Text>
                        </View>
                        <View style = {styles.top_right_banner}>
                            <TouchableOpacity onPress={() => { goToScreen(this.state.navigation, "BonplanActivity") }}>
                                <Text style = {[styles.text_neutral, styles.top_right_text]}>Consulter mes offres</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.yellow_strip}/>
                    <View style = {styles.page_container}>
                        <Text style={[styles.text_neutral, styles.TMP_coming_soon]}> Coming soon </Text>
                        <Text style={[styles.text_neutral, styles.TMP_WIP]}> Work in progress </Text>
                        <ActivityIndicator/>
                    </View>
                </View>
        );
    }
}
