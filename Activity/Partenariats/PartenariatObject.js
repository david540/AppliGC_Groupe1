export class PartenariatObject {

//[Tous,Restauration,Bar,Ski,Magasin,Loisirs,Autres]

  static ALL = 0;
  static RESTAURATION = 1;
  static BAR = 2;
  static SKI = 3;
  static MAGASIN = 4;
  static LOISIRS = 5;
  static AUTRES = 6;

  static CATEGORIES_NAME = ["Tous", "Restauration", "Bar", "Ski", "Magasin", "Loisirs", "Autres"];

  constructor(id, name, category, description, description_longue= "", photo="./photo.png", longitude = 0, latitude = 0, reductions= "") {
    this.id = parseInt(id);
    this.name = name;
    this.category = category;
    this.description = description;
    this.description_longue = description_longue != ""?description_longue:description;
    this.readMore = false;
    this.photo= photo;
    this.latitude = parseFloat(latitude);
    this.longitude = parseFloat(longitude);
    this.reductions= reductions;
  }
  is_in_category(category){
    return this.category == category;
  }
  readMoreOrLess(){
    this.readMore = !this.readMore;
  }
  toString(){
    if(this.readMore){
      return "Nom -> "+ this.name + "\n" +
      "Catégorie -> "+PartenariatObject.CATEGORIES_NAME[this.category]+"\n" +
      "Description -> " + this.description;
    }
    return "Nom -> "+ this.name;
  }
  getId(){
    return this.id;
  }
  getName(){
    return this.name;
  }
  getDescription(){
    return this.description;
  }
  getLatitude(){
    return this.latitude;
  }
  getLongitude(){
    return this.longitude;
  }
}
