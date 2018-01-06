export class PartenariatObject {

  static BAR = 0;
  static BOITE = 1;
  static FASTFOOD = 2;
  static CAFE = 3;

  static CATEGORIES_NAME = ["Bar", "Boite de nuit", "Fast-Food", "Café"];

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
