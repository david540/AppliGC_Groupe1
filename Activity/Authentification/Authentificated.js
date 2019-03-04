import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button,Picker, Alert, ScrollView, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';

/*
 * Exemple de 2ème activité
 */
export default class Authentificated extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            navigation: props.navigation,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height - getStatusBarHeight(),
            newAccount: false,
            isDialogVisible : false,
        }
    }
    ori_change = () => {
        this.setState({
            width: Dimensions.get('window').width, height: Dimensions.get('window').height - getStatusBarHeight()
        });
    }

    componentWillMount() {
        Dimensions.addEventListener("change", this.ori_change);
    }

    componentWillUnmount() {
        // Important to stop updating state after unmount
        Dimensions.removeEventListener("change", this.ori_change);
    }

    _nbCharLim = 10;


    componentDidMount() {

    }

    renderCVA(){
        if(this.props.navigation.state.params.num_cva === ''){
            return(

                <View style={[styles.categoryContainer,{width:this.state.width, height:this.state.height*6/31, backgroundColor:"#FFFFFF"}]}>
                    <Text style={{color:'grey'}}> {"\n"} </Text>
                    <Button
                        onPress={() => {
                            this.setState({ isDialogVisible: true });}}
                        title="Lier ma CVA à mon compte"
                        color="#333745">
                    </Button>
                </View>

            )
        }
        else{
            return(
                <View style={[styles.rowContainer, {width:this.state.width, height:this.state.height*6/31}]}>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={[styles.categoryContainer,{width:this.state.width, height:this.state.height*6/31, backgroundColor:"#EEF5DB"}]}>
                            <Text style={{color:'grey'}}> CVA </Text>
                            <Text style={[{color:'#cccccc'}, styles.centered_text]}>{this.props.navigation.state.params.num_cva}</Text>

                        </View>
                    </TouchableOpacity>

                </View>
            );
        }
    }

    render() {
        //_MainActivity()
        const params = {num_cva: this.props.navigation.state.params.num_cva, nom: this.props.navigation.state.params.nom, prenom: this.props.navigation.state.params.prenom, ecole: this.props.navigation.state.params.ecole, username: this.props.navigation.state.params.username};
        return (
            <View style={styles.container}>
                <View style = {{width: this.state.width, height: this.state.height/9, flexDirection: 'row', backgroundColor: '#333745', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color:'white', fontWeight: 'bold', fontSize: 16, marginTop: this.state.height/50}}>Mon compte</Text>
                    <View style = {{marginLeft: 150}}>
                        <TouchableOpacity onPress={() => { resetToScreen(this.state.navigation, "MainActivity") }}>
                            <Text style = {{color:'white', marginTop: this.state.height/50}}>Retour</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.colorLimit, { height: this.state.height*1/80, width: this.state.width }]}/>
                <ScrollView>
                    <Text
                        style={[{fontSize: 27 }, styles.centered_text]}>
                        {"\n"}Mes informations {"\n"}
                    </Text>
                    <View style={[styles.rowContainer, {width:this.state.width, height:this.state.height*6/31}]}>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={[styles.categoryContainer,{width:this.state.width, height:this.state.height*6/31, backgroundColor:"#C7EFCF"}]}>
                                <Text style={{color:'grey', fontWeight:'100'}}> Nom </Text>
                                <Text style={[{color:'#cccccc'}, styles.centered_text]}>{params.nom}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={[styles.rowContainer, {width:this.state.width, height:this.state.height*6/31}]}>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={[styles.categoryContainer,{width:this.state.width, height:this.state.height*6/31, backgroundColor:"#C7EFCF"}]}>
                                <Text style={{color:'grey', fontWeight:'100'}}> Prénom </Text>
                                <Text style={[{color:'#cccccc'}, styles.centered_text]}>{params.prenom}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={[styles.rowContainer, {width:this.state.width, height:this.state.height*6/31}]}>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={[styles.categoryContainer,{width:this.state.width, height:this.state.height*6/31, backgroundColor:"#EEF5DB"}]}>
                                <Text style={{color:'grey'}}> Ecole </Text>
                                <Text style={[{color:'#cccccc'}, styles.centered_text]}>{params.ecole}</Text>

                            </View>
                        </TouchableOpacity>

                    </View>
                    <DialogInput isDialogVisible={this.state.isDialogVisible}
                                 title={"Liaison de compte CVA"}
                                 message={"entrez votre numéro de CVA"}
                                 submitInput={ (inputText) => {Alert.alert("", "Votre demande de liaison est envoyée.");
                                     this.setState({ isDialogVisible: false });
                                 } }
                                 closeDialog={ () => {this.setState({ isDialogVisible: false })}}>
                    </DialogInput>
                    {this.renderCVA()}


                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    centered_text: {
        alignSelf: 'stretch',
        textAlign: 'center',
    },
    colorLimit: {
        backgroundColor: '#f7bd13',
    },
    rowContainer: {
        flexDirection: 'row',
    },
    categoryContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#68a0cf',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#FFFFFF'
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