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

    constructor(id, email, numAd, rueAd, codePostalAd, villeAd, type, places, quartier, description, photo="http://inprod.grandcercle.org/appli2019/images/photo.jpg", longitude, latitude, prix, surface){
        this.email = email;
        this.id = parseInt(id);
        this.type = type;
        this.places = parseInt(places);
        this.category = quartier;
        this.numAd = numAd;
        this.rueAd = rueAd;
        this.codePostalAd = codePostalAd;
        this.villeAd = villeAd;
        this.description = description;
        this.readMore = false;
        this.photo = photo;
        this.longitude = parseFloat(longitude);
        this.latitude = parseFloat(latitude);
        this.prix = parseInt(prix);
        this.surface = parseInt(surface);
        
    }
    
    is_in_category(category){
        return this.category == category;
    }

    readMoreOrLess(){
        this.readMore = !this.readMore;
    }

  toString(){
    if(this.readMore){
      return "Adresse -> "+ this.numAd + " " + this.rueAd + " " + this.villeAd + "\n" +
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
    return this.numAd + " " + this.rueAd + " " + this.villeAd;
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

  getTitre(){
    return this.type + "     " + this.prix + "€/mois";
    }

}

    
