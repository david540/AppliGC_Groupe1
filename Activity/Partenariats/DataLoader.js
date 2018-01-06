import { PartenariatObject } from './PartenariatObject'

arrayOfPartenaires = [];

export function setPartenariats(){
  arrayOfPartenaires[0] = new PartenariatObject("SOS Apéro", PartenariatObject.BAR, "Bar ambiance ouvert jusque 2h du matin");
  arrayOfPartenaires[1] = new PartenariatObject("Flam's", PartenariatObject.RESTAURANT, "Restaurant de flammekuche");
  arrayOfPartenaires[2] = new PartenariatObject("Sushi party", PartenariatObject.RESTAURANT, "Restaurant de sushi");
  arrayOfPartenaires[3] = new PartenariatObject("Coffee and go", PartenariatObject.CAFE, "Café grenoblois");
  arrayOfPartenaires[4] = new PartenariatObject("BAZARTECH", PartenariatObject.MAGASIN, "Le bazar des produits high-tech");
  arrayOfPartenaires[5] = new PartenariatObject("SOS PIZZA", PartenariatObject.FASTFOOD, "Fast-food de pizza");
}
export function getPartenariats(categoryid){
  if(arrayOfPartenaires.length === 0){
    setPartenariats();
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
