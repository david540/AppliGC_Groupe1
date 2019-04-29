import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Alert, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
//import styles from '../Styles';

export default class InfoActivity extends React.Component {

    constructor(props){
    super(props);
    this.state = {
        navigation: props.navigation,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - getStatusBarHeight(),
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
	_onPressLearnMore(){
		Alert.alert('TODO')
	}

  render() {

    return (
      <View style={styles.container}>
        <View style = {{width: this.state.width, height: this.state.height/9, flexDirection: 'row', backgroundColor: '#263238', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'white', fontWeight: 'bold', fontSize: 22}}>Informations</Text>
          <View style = {{marginLeft: 140}}>
            <TouchableOpacity onPress={() => { resetToScreen(this.state.navigation, "MainActivity") }}>
              <Text style = {{color:'white'}}>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.colorLimit,{height: this.state.height*1/80, width: this.state.width}]}>
        </View>
        <ScrollView style={{flex: 1, backgroundColor: '#263238'}}>
            <Text>
            {"\n"}
            </Text>
            <View style={[styles.partBox, { height: this.state.height/15, width: this.state.width}]}>
                  <Text style={styles.partText}>
                    Le GC, quésaco ?
                  </Text>
            </View>
            <View style={[styles.descriptionBox,{width: this.state.width}]}>
                  <Text style={styles.descriptionText}>
                    Le Grand Cercle, c'est un des plus importants BDE de France, qui regroupe toutes les écoles de Grenoble INP, soit au total près de 6000 étudiants. Il est là pour créer une harmonie et une cohésion entre les six écoles d'ingénieurs et la prépa intégrée. De l'intégration à la diplomation des étudiants, le Grand Cercle a pour mission de proposer tout au long de l'année, grâce à son équipe de 60 étudiants ultra-motivés, des événements de grande ampleur, allant d'événements sportifs à son prestigieux Gala qui regroupe pas moins de 1600 personnes.{"\n\n"}
                    Le Grand Cercle propose également des réductions avantageuses et pertinentes chez ses partenaires, de sorte que les étudiants puissent profiter pleinement de leurs années à Grenoble grâce à la CVA.{"\n\n"}
                    Enfin, grâce à des actions concrètes, le GC sensibilise les étudiants aux questions du développement durable et de la prévention à travers chacun de ses événements.
                  </Text>
            </View>
            <Text>
            {"\n \n"}
            </Text>
            <View style={[styles.partBox, { height: this.state.height/15, width: this.state.width}]}>
                  <Text style={styles.partText}>
                    Le but de l'application
                  </Text>
            </View>
            <View style={[styles.descriptionBox,{width: this.state.width}]}>
                  <Text style={styles.descriptionText}>
                    L'application est conçue pour aider les étudiants au quotidien. Elle regroupe l'ensemble des événements organisés par les cercles et associations de Grenoble INP, permettant aux étudiants de voir ce qui est organisé pour eux et parfois par eux durant leurs années d'études en école d'ingénieur.{"\n"}Elle apporte aussi de la visibilité aux nombreux partenaires qui nous suivent chaque année dans le cadre de la CVA, en les géolocalisant dans la ville, en détaillant les partenariats négociés avec eux.{"\n"}Elle permet également aux étudiants ayant acheté la CVA de pouvoir la dématérialiser.
                  </Text>
            </View>
            <Text>
            {"\n \n"}
            </Text>
            <View style={[styles.partBox, { height: this.state.height/15, width: this.state.width}]}>
                  <Text style={styles.partText}>
                    Les différents pôles
                  </Text>
            </View>
            <View style={[styles.descriptionBox,{width: this.state.width}]}>
                  <Text style={styles.descriptionText}>
                    Comme beaucoup d'associations, le Grand Cercle s'organise en différents pôles. {"\n\n"}
                    Le Bureau : Il regroupe le/la président(e), le/la secrétaire, le/la trésorier(e), le/la vice-président(e) événementiel, le/la vice-président(e) partenariats, le/la vice-président(e) clubs & associations, le/la vice-président(e) communication{"\n\n"}
                    Le pôle événementiel : L'organisation des événements c'est nous. Que ça soit sportivement (Ol'INPiades) ou par des soirées (soirée d'inté, les MINPs) en passant par le chic du Gala, on est là pour rassembler et ambiancer l'INP. Un seul mot d'ordre : prendre autant de plaisir qu'on veut en donner !{"\n\n"}
                    Le pôle clubs & associations : Si tu veux soutenir et gérer les clubs & associations de Grenoble INP c'est par ici que ça se passe ! Tu peux travailler sur différents projets comme l'idex ou le TEDx, ou bien faire évoluer les mentalités en travaillant sur de la prévention et en sensibilisant au dévelopement durable.{"\n\n"}
                    Le pôle logistique : Gestion des stocks, du matériel et installation pour les événements (courses, location de tireuses/planchas). Principaux centres d'intérêts : les camions, la bière et les rapports.{"\n\n"}
                    Le pôle partenariats : Dans ce pôle, on est en charge de démarcher et d'entretenir des partenariats pertinents pour les étudiants via la CVA. On est également en charge de la recherche des lots ponctuels ou de subventions lors de soirées typiques comme par exemple lors du Gala annuel. {"\n\n"}
                    Le pôle communication : Ici, on s'occupe de la partie community management (facebook, twitter, instagram, snapchat, site internet, application, mails), de tout ce qui touche aux graphismes, aux teasers vidéos, aux supports papiers événtuels (journal mensuel), et à chercher de nouveaux moyens de promotions originaux et créatifs.
                  </Text>
            </View>
            <Text>
            {"\n \n"}
            </Text>
            <View style={[styles.partBox, { height: this.state.height/15 , width: this.state.width}]}>
                  <Text style={styles.partText}>
                    Le recrutement
                  </Text>
            </View>
            <View style={[styles.descriptionBox,{width: this.state.width}]}>
                  <Text style={styles.descriptionText}>
                    Que tu sois 1A, 2A, listé(e) ou non, sache que tu peux candidater pour être membre de l'association, et ce quand tu le veux ! Un maître mot chez nous : la vie des étudiants, de tous les étudiants, par les étudiants. Alors oui, tu as ta pierre à apporter à l'édifice !  {"\n"}En général, les recrutements se font majoritairement durant la période post-campagnes, lorsque les 3A partent en stage de fin d'études.
                  </Text>
            </View>
            <Text>
            {"\n \n"}
            </Text>
            <View style={[styles.partBox, { height: this.state.height/15, width: this.state.width}]}>
                  <Text style={styles.partText}>
                    Nous contacter
                  </Text>
            </View>
            <View style={[styles.descriptionBox,{width: this.state.width}]}>
                  <Text style={styles.descriptionText}>
                    Pour nous contacter, vous pouvez envoyer un message via :{"\n\n"}- notre page facebook Grand Cercle,{"\n\n"}- notre compte facebook Gean Claude,{"\n\n"}- par mail à l'adresse suivante : communication@grandcercle.org.
                  </Text>
            </View>
            <Text>
            {"\n \n"}
            </Text>
            <View style={[styles.partBox, { height: this.state.height/15, width: this.state.width}]}>
                  <Text style={styles.partText}>
                    Crédits pour l'application
                  </Text>
            </View>
            <View style={styles.descriptionBox}>
                  <Text style={[styles.descriptionText, {marginBottom: 20}]}>
                    Un grand merci à David Desobry, listé BDS Storm à l'Ensimag sans qui cette application n'aurait pas vu le jour.
                    Merci à Alexandre Frances, Sarah Tulliez et Guilhaume Dauriac qui ont implémenté la partie Bons plans de l'application, et qui se sont occupé du design de l'application.
                  </Text>
            </View>
        </ScrollView>
      </View>
    );
	}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#0f0f0f',
  },
  colorLimit: {
    backgroundColor: '#f7bd13',
  },
  partBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  partText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#f7bd13',
    fontSize: 18,
    fontWeight: '200',
  },
  descriptionBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  descriptionText: {
    textAlign: 'justify',
    textAlignVertical: 'center',
    color: '#f4f4f4',
    fontSize: 16,
    fontWeight: '100',
    marginLeft: 20,
    marginRight: 20,
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
