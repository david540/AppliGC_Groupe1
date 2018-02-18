import { PartenariatObject } from './PartenariatObject'
import { Alert } from 'react-native';

arrayOfPartenaires = [];

export function setPartenariats(responseJson){
   partenaires = responseJson.split("|||");
   for(var i=1; i< partenaires.length; i++){
     infos = partenaires[i].split("&&&");
     if(infos.length >=8)
        arrayOfPartenaires[i-1] = new PartenariatObject(infos[0], infos[2], infos[1], infos[3], infos[4], infos[5], infos[6], infos[7], infos[8]);
   }
}

//https://docs.google.com/spreadsheets/d/e/2PACX-1vSgQigFT7zcr9k6Or-zX2qZbB4Rrj08vAmgF_IC6AAJaF8PGY9pxpqKOsLXzsdx1UbKxzKNGZaahsjl/pubhtml
/*
export function getPartenariats(categoryid){
  if(arrayOfPartenaires.length === 0){
    fetch('https://spreadsheets.google.com/feeds/list/1Y_w6Dq9jy4w2QUJxiXcm2fO0qoKGUZMvxMiIVSOAcwk/od6/public/values?alt=json', { //http://10.188.183.219/appligc/get_partenariats_info.php pour wifirst
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
         .then((responseJson) => {

           //setPartenariats(responseJson);
           console.log(responseJson);
     }).catch((error) => {
       console.error(error);
     });

   }
   if(categoryid === PartenariatObject.ALL){
     return arrayOfPartenaires;
   }
   var arrayToReturn = [];
   for(i=0; i<arrayOfPartenaires.length; i++ ){
     if(arrayOfPartenaires[i].is_in_category(categoryid)){
       arrayToReturn.push(arrayOfPartenaires[i]);
     }

   }
   return arrayToReturn;

}
*/

export function getPartenariats(categoryid = PartenariatObject.ALL){
  if(arrayOfPartenaires.length === 0){
    fetch('http://192.168.1.26/appligc/get_partenariats_info.php', { //http://10.188.183.219/appligc/get_partenariats_info.php pour wifirst
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
         .then((responseJson) => {

           setPartenariats(responseJson);

     }).catch((error) => {
       console.error(error);
     });

   }
   if(categoryid === PartenariatObject.ALL){
     return arrayOfPartenaires;
   }
   var arrayToReturn = [];
   for(i=0; i<arrayOfPartenaires.length; i++ ){
     if(arrayOfPartenaires[i].is_in_category(categoryid)){
       arrayToReturn.push(arrayOfPartenaires[i]);
     }

   }
   return arrayToReturn;

}
