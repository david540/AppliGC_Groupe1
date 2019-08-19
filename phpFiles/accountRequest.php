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
  // $prenom = ;
  // $nom = ;

  $pass = chaine_aleatoire(8);
  //$passhash = password_hash($pass, PASSWORD_DEFAULT);

  $arr = parseMail($email);
  $prenom = $arr[0];
  $nom = $arr[1];

  $result = $db->prepare("INSERT INTO All_Users(email, Nom, Prenom, Ecole, password, code, num_cva) VALUES(:email, :nom, :prenom, :ecole, :pass, 1, 0)");
  $result->execute(array('email' => $email,
                        'nom' => $nom,
                        'prenom' => $prenom,
                        'ecole' => $ecole,
                        'pass' => $pass,
                        ));

  //echo $pass;

  /*$to_email = 'louteranas@gmail.com';
  $subject = 'Testing PHP Mail';
  $message = 'This mail is sent using the PHP mail function';
  $headers = 'From: noreply @ company . com';
  $test = mail($to_email,$subject,$message,$headers);
  if($test==NULL) {
    echo "blabla";
  } elseif ($test == false) {
    echo "sa mere";
  } else {
    echo "enfin sa mère";
  }*/
  //==========
//
}
?>
