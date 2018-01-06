export class PartenariatObject {

  static ALL = 0;
  static BAR = 1;
  static BOITE = 2;
  static FASTFOOD = 3;
  static CAFE = 4;
  static RESTAURANT = 5;
  static MAGASIN = 6;

  static CATEGORIES_NAME = ["Tous", "Bar", "Boite de nuit", "Fast-Food", "Café", "Restaurant", "Magasin"];

  constructor(name, category, description) {
    this.name = name;
    this.category = category;
    this.description = description;
    this.readMore = false;
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
}
