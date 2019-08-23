<?php
error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");
include("authConfig.php");

// Génération d'une chaine aléatoire
function chaine_aleatoire($nb_car, $chaine = 'AZERTYUIOPMLKJHGFDSQWXCVBNazertyuiopqsdfghjklmwxcvbn123456789')
{
    $nb_lettres = strlen($chaine) - 1;
    $generation = '';
    for($i=0; $i < $nb_car; $i++)
    {
        $pos = mt_rand(0, $nb_lettres);
        $car = $chaine[$pos];
        $generation .= $car;
    }
    return $generation;
}

function parseMail($email) {

  $pieces = explode(".", $email);
  $nom = explode("@", $pieces[1]);
  if($nom[0] == "org"){
    $nom[0]= "";
  }
  $nom = preg_replace('/[0-9]+/', '', $nom[0]);
  $prenom = preg_replace('/[0-9]+/', '', $pieces[0]);
  return [ucfirst($prenom), ucfirst($nom)];
}

if($_SERVER["REQUEST_METHOD"] == "POST") {
  $json = file_get_contents('php://input');
  $obj = json_decode($json,true);

  $email = $obj["email"];
  $ecole = $obj["ecole"];
  $idEcole = $obj["idEcole"];
  // $prenom = ;
  // $nom = ;

  $pass = chaine_aleatoire(8);
  //$passhash = password_hash($pass, PASSWORD_DEFAULT);

  $arr = parseMail($email);
  $prenom = $arr[0];
  $nom = $arr[1];

  $result = $db->prepare("INSERT INTO All_Users(email, Nom, Prenom, Ecole, password, code, num_cva, idEcole) VALUES(:email, :nom, :prenom, :ecole, :pass, 0, 0, idEcole)");
  if(!$result->execute(array('email' => $email,
                        'nom' => $nom,
                        'prenom' => $prenom,
                        'ecole' => $ecole,
                        'pass' => $pass,
                        'idEcole' => $idEcole,
                      ))){
    echo 0;
    exit();
  }

  $to_email = $email;
  $subject = 'Authentification Appli GC';
  $message = "Salut !\n\nTon compte a bien été créé et voilà le mot de passe généré: $pass
Ce mot de passe ne doit être utilisé pour rien d'autre que pour cette appli car il est visible par Gean Claude (sur facebook), à qui tu peux le demander si tu rencontres un problème.

Bonne rentrée de la part de tous les membres du Grand Cercle !\n";
  $headers = 'From: grandcercle@grandcercle.org';
  $test = mail($to_email,$subject,$message,$headers);
  echo 1;
  //==========
//
}
?>
