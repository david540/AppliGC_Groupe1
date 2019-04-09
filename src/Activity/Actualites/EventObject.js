export class EventObject {

  constructor(id, jour, mois, annee, heureD, minuteD, heureF,minuteF, nomEvent, description) {
    this.jour = jour;
    this.mois = mois;
    this.annee = annee;
    this.date = jour + "/" + mois + "/" + annee;
    this.heureD = heureD;
    this.minuteD = minuteD;
    this.nomEvent = nomEvent;
    this.description = description;
    this.heureF = heureF;
    this.minuteF = minuteF;
    var d = new Date(annee, mois, jour, heureD, minuteD, 0, 0);
    this.dayName = EventObject.days[d.getDay()];
    this.monthName = EventObject.months[mois - 1];
    this.id = id;
    this.intDate = Number(annee) * 10000 + Number(mois) * 100 + Number(jour);
    this.dateStylee = (jour >= 10 ? jour.toString():"0" + jour.toString()) + "/" + (mois >= 10 ? mois.toString():"0" + mois.toString()) + "/" + annee.toString();
    this.dateToSort = (((Number(annee) * 13 + Number(mois)) * 32 + Number(jour)) * 25 + Number(heureD)) * 61 + Number(minuteD);
  }
  getIntDate(){
    return this.intDate;
  }
}

EventObject.days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
EventObject.months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
