<?php

include 'DBConfig.php';

 if($_SERVER["REQUEST_METHOD"] == "POST") {
   $flag = false;
   if (empty($_POST["nom"])) {
      echo "Nom incorrect\n";
      $flag = true;
   }else {
      $nom = $_POST["nom"];
   }
   if (empty($_POST["prenom"])) {
      echo "Prenom incorrect\n";
      $flag = true;
   }else {
      $prenom = $_POST["prenom"];
   }
   if (empty($_POST["ecole"])) {
      echo "ecole incorrect\n";
      $flag = true;
   }else {
      $ecole = $_POST["ecole"];
   }

   if (!isset($_POST["numcva"]) || _s_has_chars($_POST["numcva"])) {
     echo "Numero Cva incorrect\n";
     $flag = true;
   }else {
     $numcva = $_POST["numcva"];
   }
   try
   {
       $conn = new PDO("mysql:host=$HostName;dbname=$DatabaseName;charset=utf8", $HostUser, $HostPass);
   }
   catch(Exception $e)
   {
           die('Erreur : '.$e->getMessage());
   }
   // On ajoute une entrée dans la table jeux_video
   if($flag === false){
     $newmdp = "";
     for ($i = 0 ; $i < 8; $i++ ){
       $ascii_value = 0;
       while( !(($ascii_value >= 48 && $ascii_value <= 57) || ($ascii_value >= 65 && $ascii_value <= 90) || ($ascii_value >= 97 && $ascii_value <= 122))){
         $ascii_value = rand(48, 122);
       }
       $newmdp .= chr($ascii_value);
     }
     $stmt = $conn->prepare("INSERT INTO cva_account VALUES (:num_cva, :nom, :prenom, :ecole, :password, 0, 0)");
     $stmt->bindValue(':num_cva', $numcva);
     $stmt->bindValue(':nom', $nom);
     $stmt->bindValue(':prenom', $prenom);
     $stmt->bindValue(':ecole', $ecole);
     $stmt->bindValue(':password', $newmdp);
     $retour = $stmt->execute();
     if(!$retour){
       echo "Erreur, réessayez";
     }else{
     }
   }
 }


 function _s_has_chars ( $string ) {
   return preg_match('/[^\d]/', $string);
 }
?>
