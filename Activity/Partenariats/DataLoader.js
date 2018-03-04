import { PartenariatObject } from './PartenariatObject'

var arrayOfPartenaires = [];

export function setPartenariats(responseJson){
   var partenaires = responseJson.split("|||");
   for(var i=1; i< partenaires.length; i++){
     var infos = partenaires[i].split("&&&");
     if(infos.length >=8)
        arrayOfPartenaires[i-1] = new PartenariatObject(infos[0], infos[2], infos[1], infos[3], infos[4], infos[5], infos[6], infos[7], infos[8]);
   }
}

export function getPartenariats(categoryid = PartenariatObject.ALL){
  if(arrayOfPartenaires.length === 0){
    fetch('http://inprod.grandcercle.org/appli/get_partenariats_info.php', { //http://10.188.183.219/appligc/get_partenariats_info.php pour wifirst
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
         .then((responseJson) => {

           setPartenariats(decodeURIComponent(escape(responseJson)));

     }).catch((error) => {
       console.error(error);
     });

   }
   if(categoryid === PartenariatObject.ALL){
     return arrayOfPartenaires;
   }
   var arrayToReturn = [];
   for(var i=0; i<arrayOfPartenaires.length; i++ ){
     if(arrayOfPartenaires[i].is_in_category(categoryid)){
       arrayToReturn.push(arrayOfPartenaires[i]);
     }

   }
   return arrayToReturn;

}
