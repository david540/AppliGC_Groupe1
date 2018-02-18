import { MarkerObject } from './MarkerObject';
import { getPartenariats } from '../Partenariats/DataLoader';

export function getMarkers(){
  markers= [];
  partenaires = getPartenariats();
  for(i=0; i<partenaires.length; i++ ){
    if(partenaires[i].getLatitude() != 0){
      markers.push(new MarkerObject(partenaires[i].getId(), partenaires[i].getName(), partenaires[i].getDescription(), partenaires[i].getLatitude(), partenaires[i].getLongitude()));
    }
  }
  return markers;
}
