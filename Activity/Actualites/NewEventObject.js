import { Alert } from 'react-native';


export class NewEventObject {

  constructor(id, nom, description, dateDebut, dateFin, preventeSurAppli, asso, idEcole) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.dateDebut = new Date(dateDebut.replace(/-/g,"/"));
    this.dateFin = new Date(dateFin.replace(/-/g,"/"));
    this.preventeSurAppli = preventeSurAppli;
    this.ecole = idEcole;
    this.asso = asso;
    this.intDate = this.dateDebut.getTime();
  }
  getDateDebut(){
      var retour = ('00' + this.dateDebut.getDate()).slice(-2) + '-' +
          ('00' + (this.dateDebut.getMonth()+1)).slice(-2) + '-' +
          this.dateDebut.getFullYear() + ' ' +
          ('00' + this.dateDebut.getHours()).slice(-2) + ':' +
          ('00' + this.dateDebut.getMinutes()).slice(-2) + ':' +
          ('00' + this.dateDebut.getSeconds()).slice(-2);
      return retour;
  }
  getYYYYMMDDdate(){
    return this.dateDebut.getFullYear() + '/' +
        ('00' + (this.dateDebut.getMonth()+1)).slice(-2) + '/' +
        ('00' + this.dateDebut.getDate()).slice(-2);
  }
  getDateFin(){
      var retour = ('00' + this.dateFin.getDate()).slice(-2) + '-' +
          ('00' + (this.dateFin.getMonth()+1)).slice(-2) + '-' +
          this.dateFin.getFullYear() + ' ' +
          ('00' + this.dateFin.getHours()).slice(-2) + ':' +
          ('00' + this.dateFin.getMinutes()).slice(-2) + ':' +
          ('00' + this.dateFin.getSeconds()).slice(-2);
      return retour;
  }
  getIntDate(){
    return this.intDate;
  }
}
