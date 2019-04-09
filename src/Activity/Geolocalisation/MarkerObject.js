export class MarkerObject {

  constructor(id, name, description, latitude = 0, longitude = 0) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.latitude = latitude;
    this.longitude = longitude;
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
