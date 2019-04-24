import React from 'react';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Text, View, ScrollView, Dimensions, Alert, ActivityIndicator, FlatList, Picker, Modal, Image, TouchableOpacity} from 'react-native';
import { List, ListItem } from 'react-native-elements'; // Version can be specified in package.json
import { resetToScreen, goToScreen } from '../../MainActivity';
import { styles } from '../../Styles';

export default class MesOffresActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        }
    }

    openModal(item){
        this.setState({itemModal: item, descriptionModal: item.description, 
                       adresseModal: item.getAdresse(), surfaceModal: item.surface, 
                       prixModal: item.prix, typeModal: item.type, 
                       placesModal: item.places, modalVisible: true});
    }

    closeModal(){
        this.setState({modalVisible: false});
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.top_banner}>
                    <View style={styles.top_left_banner}>
                        <Text style={[styles.text_neutral, styles.page_title_left]}> Mes offres </Text>
                    </View>
                    <View style = {styles.top_right_banner}>
                        <TouchableOpacity onPress={() => {goToScreen(this.state.navigation, "LogementActivity") }}>
                            <Text style = {[styles.text_neutral, styles.top_right_text]}> Retour </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.yellow_strip}/>
                <View style={styles.full_page_list_box}>
                    <List>
                    </List>
                </View>
                <Modal
                  visible = {this.state.modalVisible}
                  animationType = {'fade'}
                  onRequestClose={() => this.closeModal()}
                  transparent = {true}
                >
                    <View style={styles.yellow_strip}/>
                </Modal>

            </View>
        );

    }
}
