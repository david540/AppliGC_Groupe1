export function validate(fieldName, value) {
    if (fieldName == 'nb_places') {
        return (value == '' ? 'Nombre de places manquant' : '' ) 
    } else if (fieldName == 'adresseNum') {
        return (value == '' ? 'Num manquant' : '' ) 
    } else if (fieldName == 'adresseRue') {
        return (value == '' ? 'Rue manquante' : '' ) 
    } else if (fieldName == 'ville') {
        return (value == '' ? 'Ville manquante' : '' ) 
    } else if (fieldName == 'codePostal') {
        return (value == '' ? 'Code postal manquant' : '' ) 
    } else if (fieldName == 'surface') {
        return (value == '' ? 'Surface manquante' : '' ) 
    } else if (fieldName == 'description') {
        return (value == '' ? 'Description manquante' : '' ) 
    } else if (fieldName == 'loyer') {
        return (value == '' ? 'Loyer manquant' : '' ) 
    } else if (fieldName == 'validation') {
        return (value == '' ? 'Certains champs sont incomplets !' : '')
    }
}

export function isEmpty(string) {
    return (string == '' ? true : false);
}
