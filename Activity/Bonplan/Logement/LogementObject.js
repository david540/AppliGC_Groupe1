export class LogementObject {

    //[Tous, Ouest, Centre, Est, Hypercentre, Presqu'île, Gare, Ile Verte, Saint-Martin-d'Hères]
    
    static ALL = 0;
    static OUEST = 1;
    static CENTRE = 2;
    static EST = 3;
    static HYPERCENTRE = 4;
    static PRESQUILE = 5;
    static GARE = 6;
    static ILEVERTE = 7;
    static SMH = 8;

    static CATEGORIES_NAME = ["Tous", "Ouest", "Centre", "Est", "Hypercentre", "Presqu'île", "Gare", "Ile Verte", "Saint-Martin-d'Hères"];

    constructor(id, numAd, rueAd, type, places, quartier, nom=null, description, photo="./photo.jpg", longitude = 0, latitude = 0, prix=0){
        this.id = parseInt(id);
        this.type;
        this.places = parseInt(places);
        this.quartier = quartier;
        this.numAd = numAd;
        this.rueAd = rueAd;
        this.nom = nom;
        this.description = description;
        this.readMore = false;
        this.photo = photo;
        this.longitude = longitude;
        this.latitude = latitude;
        this.prix = prix;
        
    }
    
    is_in_category(category){
        return this.quartier == category;
    }

    readMoreOrLess(){
        this.readMore = !this.readMore;
    }

  toString(){
    if(this.readMore){
      return "Adresse -> "+ this.numAd + " " + this.rueAd + "\n" +
      "type -> "+ this.type +"\n" +
      "Description -> " + this.description + "\n" +
      "Prix -> " + this.prix;
    }
    return "Adresse -> "+ this.numAd + " " + this.rueAd;
  }
  getId(){
    return this.id;
  }
  getAdresse(){
    return this.adresse;
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

    
