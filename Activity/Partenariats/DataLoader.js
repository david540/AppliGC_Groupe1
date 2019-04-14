import { PartenariatObject } from './PartenariatObject'
import { Alert } from 'react-native';

var arrayOfPartenaires = [];
var arrayOfPointsDinterets = [];

export function setPartenariats(responseJson){
   var partenaires = responseJson.split("|||");
   var compteurPartenaires = 0;
   var compteurPI = 0;

   for(var i=1; i< partenaires.length; i++){
     var infos = partenaires[i].split("&&&");
     if(infos.length >=8){
       if(infos[1] > 0)
        arrayOfPartenaires[compteurPartenaires++] = new PartenariatObject(infos[0], infos[2], infos[1], infos[3], infos[4], infos[5], infos[6], infos[7], infos[8]);
      else
        arrayOfPointsDinterets[compteurPI++] = new PartenariatObject(infos[0], infos[2], infos[1], infos[3], infos[4], infos[5], infos[6], infos[7], infos[8]);
      }
   }
}

export function getPartenariats(fonctionThen, categoryid = PartenariatObject.ALL){
  if(arrayOfPartenaires.length == 0){
    fetch('http://inprod.grandcercle.org/appli/get_partenariats_info.php', { //http://10.188.183.219/appligc/get_partenariats_info.php pour wifirst
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
         .then((responseJson) => {
           //Alert.alert(responseJson);

           setPartenariats(decodeURIComponent(escape(responseJson)));

     }).catch((error) => {
       console.error(error);
     });

   }
   if(categoryid === PartenariatObject.ALL){
     fonctionThen();
     return arrayOfPartenaires;
   }
   var arrayToReturn = [];
   for(var i=0; i<arrayOfPartenaires.length; i++ ){
     if(arrayOfPartenaires[i].is_in_category(categoryid)){
       arrayToReturn.push(arrayOfPartenaires[i]);
     }

   }
   fonctionThen();
   return arrayToReturn;

}

export function getPointsDinterets(){
  if(partenairesAreLoaded())
    return arrayOfPointsDinterets;
  else //erreur
    return [];
}

export function partenairesAreLoaded(){
  return arrayOfPartenaires != 0;
}
