import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';


// Définition de couleurs
const primaryColor = "#1abc9c";
const lightGrey = "#ecf0f1";
const darkGrey = "#bdc3c7";
const background = "#263238";
const yellow_strip_color = "#f7bd13";

// Largeur et hauteur de la fenêtre
const wwidth = Dimensions.get('window').width;
const wheight = Dimensions.get('window').height - getStatusBarHeight();
const leftheight = wheight - (1/80 + 1/9)*wheight;

export const styles = StyleSheet.create({

    //*****************//
    //** VIEW STYLES **//
    //*****************//
    
    // Loading screen
    loading_screen: {
        justifyContent: 'center',
        alignItems: 'center',
        height: wheight,
        width: wwidth,
    },

    // Container vide ; hauteur à préciser lors de l'utilisation.
    empty: {
        width: wwidth,
        backgroundColor: background,
        
    },

    // Container principal de la page d'accueil
    main_container: {
        flex: 1,
        backgroundColor: background
    },

    // Bandeau supérieur d'une page - là où met le nom de la page
    // et éventuellement un bouton en haut à droite
    // [LARGEUR : Toute - HAUTEUR : écran/9]
    top_banner: {
        width: wwidth,
        height: wheight/9,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: background,
    },

    // Comme un bandeau mais 2 fois moins haut 
    tabs: {
        width: wwidth,
        height: wheight/18,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: background,
    },
    
    tab_2: {
        width: wwidth/2,
        height: wheight/18,
        alignContent: 'center',
        justifyContent: 'center'
    },
    
    // Bandeau supérieur de la page d'accueil
    // [LARGEUR : écran/2 - HAUTEUR : écran/10]
    main_banner: {
        width: wwidth,
        height: wheight/10,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },

    // Semi-bandeau supérieur gauche d'une page
    // [LARGEUR : écran/2 - HAUTEUR : écran/9]
    top_left_banner: {
        width: wwidth/2,
        height: wheight/9,
        alignContent: 'center',
        justifyContent: 'center'
    },

    // Semi-bandeau supérieur droit d'une page
    // [LARGEUR : écran/2 - HAUTEUR : écran/9]
    top_right_banner: {
        width: wwidth/2,
        height: wheight/9,
        alignContent: 'center',
        justifyContent: 'center'
    },

    // Ligne séparatrice jaune
    // [LARGEUR : Toute - HAUTEUR : 1/80]
    yellow_strip: {
        width: wwidth,
        height: wheight/80,
        backgroundColor: yellow_strip_color
    },
    thin_yellow_strip: {
        width: wwidth,
        height: wheight/120,
        backgroundColor: yellow_strip_color
    },

    // Container sur le reste d'une page
    // [LARGEUR : Toute - HAUTEUR : Toute - hauteur(top_banner + yellow_strip) ]
    page_container: {
        width: wwidth,
        height: leftheight,
        alignContent: 'center',
        justifyContent: 'center'
    },

    // Container de 2 boutons sur la page d'accueil
    // [LARGEUR : Toute - HAUTEUR : 200 ou 9/30 * wheight]
    button_row: {
        flexDirection: 'row',
        backgroundColor: background,
        width: wwidth,
        height: wheight*9/30,
    },

    // Boutons de la page MainActivity
    main_button: {
  	    justifyContent: 'center',
	    alignItems: 'center',
        backgroundColor:'#68a0cf',
        borderRadius:100,
        borderWidth: 5,
        borderColor: background,
        width: wwidth/2,
        height: wheight*9/30,
    },

    // Boutons de la page Bons plans
	bonplan_button: {
  	    justifyContent: 'center',
	    alignItems: 'center',
        backgroundColor:'#68a0cf',
        borderRadius:100,
        borderWidth: 8,
        borderColor: background,
        width: wwidth/2,
        height: wheight*9/30,
	},
    
	titleContainerBox: {
        backgroundColor: background,
        justifyContent: 'center',
	    alignItems: 'center',
	},
	rowContainer: {
	    flexDirection: 'row',
        backgroundColor: background,
	},

    // Picker View box
    picker_box: {
        height: wheight/18,
        backgroundColor: "white",
    },

    // List box (must often leave space for a bottom button)
    // HAUTEUR : Page - 1/9 - 1/10 (bouton du bas) - 1/80 - 1/18 (picker)
    list_box: {
        height: leftheight - wheight*28/180,
        backgroundColor: "white",
    },
    // List box for covoit (tabs + thin_strip + text + field + text + picker + texte + picker + empty(20))
    covoit_list_box: {
        height: leftheight - wheight*(1/18 + 1/120 + 3/80 + 3/80 + (1/80) + 3/80 + (1/80) + 1/10) - 50 - 25 - 25 - 20,
        backgroundColor: "white",
    },
    // Pareil sans bouton en bas
    full_page_list_box: {
        height: leftheight,
        backgroundColor: "white",
    },

    bottom_button: {
        width: wwidth,
        height: wheight/10,
        flexDirection: 'row',
        backgroundColor: background,
        justifyContent: 'center',
        alignItems: 'center',
    },

	categoryContainer: {
  	    justifyContent: 'center',
	    alignItems: 'center',
        backgroundColor:'#68a0cf',
        borderRadius:10,
        borderWidth: 2,
        borderColor: '#000000'
	},



    // MODAL SECTION
    modalBackgroundContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(100,100,100,0.5)',
    },
    modalContainer: {
        backgroundColor:'white',
        alignItems: 'center',
        height: wheight*8/9, 
        width: wwidth*8/9,
    },
    scrollViewModalContainer: {
        alignItems: 'center',
    },
    colorLimitModal: { 
        backgroundColor: '#0f0f0f',
        height: wheight * 1/200,
        width: wwidth* 8/9,
    },
    modalButtons: {
        flex: 1,
        flexDirection: 'row',
    },
    modalTitleBox: {
        backgroundColor: "#f7bd13",
        width: wwidth*8/9,
    },
    
    // FORM SECTION
    
    form_page: {
        marginHorizontal: wwidth/15,
        marginTop: wheight/60,
        height: (1 - 1/9 - 1/60)*wheight,
        width: (1 - 2/15)*wwidth,
    },
    
    form_field_regular: {
        height: 40,
        width: 260,
        borderColor: 'black',
        borderRadius: 2,
        backgroundColor:'white',
        marginHorizontal:15,
        marginTop : 10,
        marginBottom : 5
    },
    
    form_field_desc: {
        height: 150,
        width: 260,
        borderColor: 'black',
        borderRadius: 2,
        backgroundColor:'white',
        marginHorizontal:15,
        marginTop : 10,
        marginBottom : 5,
        textAlignVertical: 'top',
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },

    form_field_short: {
        height: 40,
        width: 50,
        borderColor: 'black',
        borderRadius: 2,
        backgroundColor:'white',
        marginHorizontal:15,
        marginTop : 10,
        marginBottom : 5
    },

    form_field_half: {
        height: 40,
        width: 130,
        borderColor: 'black',
        borderRadius: 2,
        backgroundColor:'white',
        marginHorizontal:15,
        marginTop : 10,
    },
    form_field_medium: {
        height: 40,
        width: 180,
        borderColor: 'black',
        borderRadius: 2,
        backgroundColor:'white',
        marginHorizontal:15,
        marginTop : 10,
        marginBottom : 5
    },

    form_validation_button: {
  	    justifyContent: 'center',
	    alignItems: 'center',
        backgroundColor:'#68a0cf',
        borderRadius:10,
        borderWidth: 2,
        borderColor: '#000000',
        width: wwidth/2,
        height: wheight/10,
        marginHorizontal: wwidth/5,
        marginBottom: 25,
    },
    form_picker_hour:{
        height: 25,
        width: 80,
        marginHorizontal: 15,
        backgroundColor: "white",
        marginTop: wheight/80,
    },
    form_picker_month:{
        height: 25,
        width: 200,
        marginHorizontal: 15,
        backgroundColor: "white",
        marginTop: wheight/80,
    },
    form_picker_style_hour:{
        height: 25,
    },
    picker_form_regular: {
        height: 50,
        width: 260,
        borderColor: 'black',
        borderRadius: 2,
        backgroundColor:'white',
        marginHorizontal:15,
        marginTop : 10,
        marginBottom : 10,
    },

      //*****************//
      //** TEXT STYLES **//
      //*****************//
      

    text_neutral: {
    },
	centered_text: {
		alignSelf: 'stretch',
		textAlign: 'center',
	},
	titleContainerText: {
    	color: 'white',
    	fontSize: 32,
    	fontWeight: 'bold',
    	textAlign: 'center',
        textAlignVertical: 'center',
	},
    page_title_left: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    top_right_text: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    bubbleTitleText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 25,
    },
    bubbleDescText: {
        textAlign: 'center',
        textAlignVertical: 'bottom',
        color: '#e0e0e0',
    },
	bottomContainerText: {
  	    color: 'white',
  	    fontSize: 20,
  	    fontWeight: 'bold',
  	    textAlign: 'center',
	},
    TMP_coming_soon: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
    },
    TMP_WIP: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },

    // MODAL SECTION
    
    
    modalTitleText: {
        fontSize:30,
        fontWeight: '400',
        color:'white',
        textAlign: 'center',
    },
    modalDescriptionLeft: {
        fontSize: 18,
        textAlign: 'left',
        marginLeft: 20,
        color:'black',
    },
    modalDescriptionRight: {
        fontSize: 18,
        textAlign: 'right',
        marginRight: 20,
        color:'black',
    },
    modalDescriptionTitleText: {
        fontWeight: '200',
        fontSize: 24,
    },
    modalDescriptionReductionText: {
        textAlign: 'justify',
        marginLeft: 20,
        marginRight: 20,
    },
    modalReductionTitleText: {
        fontWeight: '200',
        fontSize: 24,
    },

    // FORM SECTION
    
    field_name_covoit: {
        color: 'white',
        marginLeft: wwidth/10
    },

    form_incomplete_error_regular: {
        color: '#ff0000',
        width: 260,
        marginLeft: 15,
        marginBottom: 4,
    },
    form_incomplete_error_short: {
        color: '#ff0000',
        width: 65,
        marginLeft: 15,
        marginBottom: 4,
    },
    form_incomplete_error_half: {
        color: '#ff0000',
        width: 115,
        marginHorizontal: 15,
        marginBottom: 4,
    },
    form_text_field_covoit: {
        color: 'white',
        width: 130,
        marginLeft: 15,
        marginTop: wheight/80,
        height: wheight/40,
    },
    form_text_field: {
        width: 130,
        marginLeft: 15,
        marginTop: wheight/80,
    },
    form_text_field_half: {
        width: 130,
        marginLeft: 15,
        marginRight: 15,
        marginTop: wheight/80,
    },
    form_incomplete_error_medium: {
        color: '#ff0000',
        width: 190,
        marginLeft: 15,
        marginBottom: 4,
    },

    form_validation_button_text: {
        color: 'white',
        fontSize: 20,
    }



});
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1'
  },
  modalButtons: {
    flex: 1,
    flexDirection: 'row',
  },
  modalTitleBox: {
    backgroundColor: "#f7bd13",
  },
  modalTitleText: {
    fontSize:30,
    fontWeight: '400',
    color:'white',
    textAlign: 'center',
  },
  colorLimitModal: { //limitation black
    backgroundColor: '#0f0f0f',
  },
  modalButtons: {
    flex: 1,
    flexDirection: 'row',
  },
});

const styles = StyleSheet.create({
  colorLimit: {
    backgroundColor: '#f7bd13',
  },
  modalBackgroundContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100,100,100,0.5)',
  },
  modalContainer: {
    backgroundColor:'white',
    alignItems: 'center',
  },
});
*/
