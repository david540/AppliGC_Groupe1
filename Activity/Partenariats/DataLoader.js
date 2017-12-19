import { PartenariatObject } from './PartenariatObject'

partenariatTest = new PartenariatObject("SOS Apéro", PartenariatObject.BAR, "Bar ambiance ouvert jusque 2h du matin");

export function getPartenariats(){
  var arrayOfPartenaires = [];
  arrayOfPartenaires[0] = partenariatTest;
  return arrayOfPartenaires;
}
