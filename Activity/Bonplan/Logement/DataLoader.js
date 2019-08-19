import { LogementObject } from './LogementObject'
import { Alert } from 'react-native';

var arrayOfLogements = [];

export function setLogements(responseJson){
    var logements = responseJson.split("|||");
    var compteurLogements = 0;

    for(var i=1; i < logements.length; i++){
        var infos = logements[i].split("&&&");

        if(infos.length >= 14){
            arrayOfLogements[compteurLogements++] = new LogementObject(infos[0], infos[1], infos[3], infos[4], infos[5], infos[6], infos[7], infos[8], infos[2], infos[9], infos[10], infos[11], infos[12], infos[13], infos[14]);

        }
    }
}

export function getLogements(fonctionThen, categoryid = LogementObject.ALL){
  return arrayOfLogements;
    if(arrayOfLogements.length == 0){

    fetch('http://inprod.grandcercle.org/appli2019/get_logements_info.php', { //http://inprod.grandcercle.org/appli2019/get_partenariats_info.php pour wifirst
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
         .then((responseJson) => {
           //Alert.alert(responseJson);

           setLogements(decodeURIComponent(escape(responseJson)));

     }).catch((error) => {
       console.error(error);
     });

   }
   if(categoryid === LogementObject.ALL){
     fonctionThen();
     return arrayOfLogements;
   }
   var arrayToReturn = [];
   for(var i=0; i<arrayOfLogements.length; i++ ){
     if(arrayOfLogements[i].is_in_category(categoryid)){
       arrayToReturn.push(arrayOfLogements[i]);
     }

   }
   fonctionThen();
   return arrayToReturn;


}


export function logementsAreLoaded(){
    return arrayOfLogements != 0;
}
