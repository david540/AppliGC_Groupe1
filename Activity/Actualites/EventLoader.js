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

export function setEvents(responseJson){
   var events = responseJson.split("|||");
   for(var i=1; i< events.length; i++){
     var infos = events[i].split("&&&");
     if(infos.length >= 7)
        arrayOfEvents[i-1] = new EventObject(infos[0], infos[1], infos[2], infos[3], infos[4], infos[5], infos[6], infos[7], infos[8], infos[9]);
   }
   arrayOfEvents.sort(compare);
}

export function getEvents(reload = false){
  if(arrayOfEvents.length === 0 || reload){
    fetch('http://inprod.grandcercle.org/appli/get_event_info.php', { //http://10.188.183.219/appligc/get_partenariats_info.php pour wifirst
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
         .then((responseJson) => {

           setEvents(decodeURIComponent(escape(responseJson)));

     }).catch((error) => {
       console.error(error);
     });

   }
   return arrayOfEvents;
}
