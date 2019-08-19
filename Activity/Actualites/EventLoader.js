import { EventObject } from './EventObject'
import { NewEventObject } from './NewEventObject'
import { Alert } from 'react-native';
import _ from 'lodash';

var arrayOfEvents = [];

function compare(a,b) {
  if (a.intDate < b.intDate)
    return -1;
  if (a.intDate > b.intDate)
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
   var currentIntDate = currentDate.getTime();

   var events = responseJson.split("|||");
   var compteur = 0;
   for(var i=1; i< events.length; i++){
     var infos = events[i].split("&&&");
     //this.date = new Date(this.annee, this.mois - 1, this.jour + 1, 7, 0, 0, 0);

     //intDate = getIntDate(Number(infos[3]), Number(infos[2]), Number(infos[1]) + 1, 7, 0);
//     Alert.alert(intDate.toString() + " " + currentIntDate.toString());

    // if(infos.length >= 7 && intDate > currentIntDate){
       //Alert.alert(intDate.toString() +" " + currentIntDate.toString())

        //arrayOfEvents[compteur++] = new EventObject(infos[0], infos[1], infos[2], infos[3], infos[4], infos[5], infos[6], infos[7], infos[8], infos[9]);
      candidat = new NewEventObject(infos[0], infos[1], infos[2], infos[3], infos[4], infos[5], infos[6]);
      if(candidat.getIntDate() - currentIntDate > - 24 * 3600 * 1000)
        arrayOfEvents[compteur++] = candidat;
    //  }
   }
   arrayOfEvents.sort(compare);
}

export function getEvents(idEcole, fonctionThen = () => {}, reload = false){
  if(arrayOfEvents.length === 0 || reload){
    //Alert.alert(idEcole.toString());
    //fetch('http://inprod.grandcercle.org/appli2019/loadEvents.php, {
    fetch('http://inprod.grandcercle.org/appli2019/loadEvents.php'+ (idEcole && idEcole != 0 ? '?idEcole=' + idEcole.toString() : ''), { //http://inprod.grandcercle.org/appli2019/get_partenariats_info.php pour wifirst
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
         .then((responseJson) => {

           //Alert.alert(responseJson);
           setEvents(decodeURIComponent(escape(responseJson)));
           fonctionThen();
     }).catch((error) => {
       console.error(error);
     });
   }else{
     fonctionThen();
   }
   return arrayOfEvents;
   //return [];
}

export function getArrayOfEvents(){
  return arrayOfEvents;
}

export function getArrayOfSectionData(){

    let ds = _.groupBy(arrayOfEvents, d => d.getYYYYMMDDdate());
    ds = _.reduce(
      ds,
      (acc, next, index) => {
        acc.push({
          key: index,
          data: next
        });
        return acc;
      },
      []
    );
    ds = _.orderBy(ds, ["key"]);
    return ds;
}
