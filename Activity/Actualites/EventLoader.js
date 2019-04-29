import { EventObject } from './EventObject'
import { Alert } from 'react-native';

var arrayOfEvents = [];

function compare(a,b) {
  if (a.dateToSort < b.dateToSort)
    return -1;
  if (a.dateToSort > b.dateToSort)
    return 1;
  return 0;
}

function getIntDate(year, month, day, heure, minutes){
  return (((year * 13 + month) * 32 + day) * 25 + heure) * 61 + minutes;
}

export function setEvents(responseJson){
    arrayOfEvents = [];
   var currentDate = new Date();
   //var currentIntDate = (((currentDate.getFullYear() * 13 + currentDate.getMonth() + 1) * 32 + currentDate.getDay()) * 25 + currentDate.getHours()) * 61 + currentDate.getMinutes();
   //Alert.alert(currentDate.getFullYear().toString()+ " "+ (currentDate.getMonth() + 1).toString() + " " + currentDate.getDate().toString()+ " " +currentDate.getHours().toString() + " " + currentDate.getMinutes().toString())
   var currentIntDate = getIntDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes());

   var events = responseJson.split("|||");
   var compteur = 0;
   for(var i=1; i< events.length; i++){
     var infos = events[i].split("&&&");
     //this.date = new Date(this.annee, this.mois - 1, this.jour + 1, 7, 0, 0, 0);

     intDate = getIntDate(Number(infos[3]), Number(infos[2]), Number(infos[1]) + 1, 7, 0);
//     Alert.alert(intDate.toString() + " " + currentIntDate.toString());

     if(infos.length >= 7 && intDate > currentIntDate){
       //Alert.alert(intDate.toString() +" " + currentIntDate.toString())
        arrayOfEvents[compteur++] = new EventObject(infos[0], infos[1], infos[2], infos[3], infos[4], infos[5], infos[6], infos[7], infos[8], infos[9]);
      }
   }
   arrayOfEvents.sort(compare);
}

export function getEvents(stringOfChoixAssos, fonctionThen = () => {}, reload = false){
  /*if(arrayOfEvents.length === 0 || reload){
    fetch('http://192.168.0.11/AppliGC_Groupe1/phpFiles/loadEvents.php, {
    //fetch('http://inprod.grandcercle.org/appli/get_event_info.php?assos='+stringOfChoixAssos, { //http://10.188.183.219/appligc/get_partenariats_info.php pour wifirst
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
         .then((responseJson) => {
           setEvents(decodeURIComponent(escape(responseJson)));
           fonctionThen();
     }).catch((error) => {
       console.error(error);
     });
   }
   return arrayOfEvents;*/
   return [];
}
