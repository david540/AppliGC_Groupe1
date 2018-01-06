import { PartenariatObject } from './PartenariatObject'

export function getPartenariats(){
  var arrayOfPartenaires = [];
  arrayOfPartenaires[0] = new PartenariatObject("SOS Apéro", PartenariatObject.BAR, "Bar ambiance ouvert jusque 2h du matin");
  arrayOfPartenaires[1] = new PartenariatObject("Flam's", PartenariatObject.RESTAURANT, "Restaurant de flammekuche");
  arrayOfPartenaires[2] = new PartenariatObject("Sushi party", PartenariatObject.RESTAURANT, "Restaurant de sushi");
  arrayOfPartenaires[3] = new PartenariatObject("Coffee and go", PartenariatObject.BAR, "Café grenoblois");
  arrayOfPartenaires[4] = new PartenariatObject("BAZARTECH", PartenariatObject.BAR, "Le bazar des produits high-tech");
  arrayOfPartenaires[5] = new PartenariatObject("SOS PIZZA", PartenariatObject.FASTFOOD, "Fast-food de pizza");
  return arrayOfPartenaires;
}
