export class AssoObject {

  constructor(id, name, isSelected) {
    this.id = id;
    this.name = name;
    this.isSelected = isSelected;
  }
  getName(){
    return this.name;
  }
  getIsSelected(){
    return this.isSelected;
  }
}
