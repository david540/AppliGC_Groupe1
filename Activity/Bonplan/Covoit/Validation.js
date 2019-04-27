export function validate(fieldName, value) {
    if (fieldName == 'departure') {
        return (value == '' ? 'Ville de départ manquante' : '' ) 
    } else if (fieldName == 'arrival') {
        return (value == '' ? "Ville d'arrivée manquante" : '' ) 
    } else if (fieldName == 'validation') {
        return (value == '' ? 'Certains champs sont incomplets !' : '')
    }
}

export function isEmpty(string) {
    return (string == '' ? true : false);
}
