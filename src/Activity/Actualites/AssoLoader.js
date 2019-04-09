import { AssoObject } from './AssoObject';
import { Alert, AsyncStorage } from 'react-native';
import { getEvents } from './EventLoader';
const fetch = require('node-fetch');

var arrayOfAssos = [];
var arrayOfChoixAssos = [];

export function setAssos(responseJson){
   var assos = responseJson.split("|||");
   var compteur = 0;
   for(var i=1; i< assos.length; i++){
     var infos = assos[i].split("&&&");
     if(infos.length >= 2){
        arrayOfAssos[compteur++] = new AssoObject(infos[0], infos[1], false);
      }
   }
}

export function getAssosAndEvents(fonctionThen){
  if(arrayOfAssos.length === 0){
    fetch('http://inprod.grandcercle.org/appli/get_liste_assos.php', { //http://10.188.183.219/appligc/get_partenariats_info.php pour wifirst
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
         .then((responseJson) => {
           setAssos(decodeURIComponent(escape(responseJson)));
           try{
             AsyncStorage.getItem('choixassos').then((choixAssos) => {
               if(choixAssos){
                 arrayOfChoixAssos = choixAssos.split(";");
                 getEvents("0;" + choixAssos);
               }else{
                 getEvents("0");
               }
             });
           }catch(error){

             //Alert.alert("non");
             //le fichier n'existe pas, premiere utilisation ?
             arrayOfChoixAssos = [];
             getEvents("0");
           }
           fonctionThen();

     }).catch((error) => {
       console.error(error);
     });

   }
   return arrayOfAssos;
}
export function getOnlyEvents(fonctionThen){
  var arrayOfEvents = [];
  try{
    AsyncStorage.getItem('choixassos').then((choixAssos) => {
      if(choixAssos){
        arrayOfChoixAssos = choixAssos.split(";");
        arrayOfEvents = getEvents("0;" + choixAssos, fonctionThen, true);
      }else{
        arrayOfEvents = getEvents("0", fonctionThen, true);
      }
    });
  }catch(error){

    //Alert.alert("non");
    //le fichier n'existe pas, premiere utilisation ?
    arrayOfEvents = getEvents("0", fonctionThen, true);
  }
  return arrayOfEvents
}


export function eventsAreLoaded(){
  return arrayOfAssos.length !== 0;
}

export function getArrayOfChoixAssos(){
  return arrayOfChoixAssos;
}
