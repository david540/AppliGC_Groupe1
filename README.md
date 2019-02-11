Premier commit : pas fait

# Premier lancement de l'appli (groupe 1):

* mkdir ProjetGC
* cd ProjetGC
* git init
* git remote add origin https://github.com/david540/AppliGC_Groupe2/
* git pull origin master
* Installer npm : https://doc.ubuntu-fr.org/nodejs
* npm install -g react-native-cli
* En fonction de l'output, faire export PATH=... comme indiqué dans https://stackoverflow.com/questions/37189081/react-native-command-not-found. NE PAS FAIRE react-native init
* Lancer la commande : npm install
* Sur votre android: Activer le mode développeur https://www.androidpit.fr/comment-activer-options-developpeurs-android
* Dans les parametres/Options pour développeurs: Cocher Débogage USB 
* télécharger le SDK (pas android studio) https://developer.android.com/studio/
* Mettre la location du sdk dans android/local.properties
* Se placer dans le dossier tools/ du SDK et entrer la commande : ./android update sdk --no-ui --all --filter platform-tools,android-25,extra-android-m2repository 
* Vous pouvez maintenant lancer l'appli sur votre smartphone avec la commande : react-native run-android
* La compilation marche mais l'application ne se lance pas : react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Cahier des charges : Extensions de l’application du Grand Cercle
Membre d’équipe : Anas Louter (MMIS), Guillaume Caulier (MMIS), Thomas Ludeau (MMIS)
Encadrant : Sébastien Viardot

### Côté CVA :
- Si possède une CVA, possibilité de demander ses identifiants à son adresse mail
Grenoble INP avec son numéro CVA, une seule fois.
Si une adresse mail a été utilisée plusieurs fois, on prévient l’utilisateur qu’il doit
regarder dans sa boite mail.
Il y aura vérification que les noms et prénoms présents dans l’adresse mail
correspondent à celles dans l’adresse mail. Si ce ne sont pas les mêmes, on envoie un
rapport d’erreur qui sera lue par un GC.
- S’il ne possède pas de CVA, ajout nom, prénom, école.

### Côté évènements/calendrier commun :
- Ajout d’un système d’authentification pour les associations, leur permettant de
devenir admin des évènements qui les concernent et d’en ajouter de nouveaux. Lors
d’ajout / modification d’évènement, l’association devra choisir quelle portée il donne
à son évènement : Seulement les membres de son association, les étudiants de
l’école si c’est une asso d’école ou les étudiants de Grenoble INP si c’est une asso
INP. (Les cercles pourront également publier dans l’INP pour les évènements inter
écoles)
- Être admin d’un évènement implique pouvoir modifier son contenu, ouvrir et fermer
la billetterie associée, voir le listing des gens qui veulent payer l’évènement,
supprimer des gens du listing s’ils ont payé où s’ils sont refusés.
- Un simple utilisateur peut simplement avoir accès à la description de l’évènement, et
demander à payer l’évènement lorsque la billetterie est ouverte. Pour se faire il
devra spécifier nom, prénom, CVA et le numéro de téléphone associé à son Lydia
pour recevoir une demande de payement envoyée par un admin et qui validerait
donc la place si le payement est validé.
Son nom, prénom et son numéro de CVA devront être en autocomplétions s’il est
connecté à sa CVA ou s’il a entré ses informations sans CVA dans la partie CVA, mais
pourront quand même être modifié si la personne qui veut payer n’a pas l’appli
(pour un externe par exemple).
Pour empêcher du spam, un téléphone ne doit pas pouvoir faire de demande de
payement à un même évènement plus d’une fois par jour.Projet de spécialité à l’initiative des étudiants
- Le grand cercle aura un compte super admin par école, qui pourra modifier tous les
évènements de toutes les assos de l’école, et un compte ultra admin qui pourra
modifier tous les évènements entrés dans l’application, de n’importe quelle
association.
