<?php
  include("authConfig.php");

   if($_SERVER["REQUEST_METHOD"] == "POST") {
      $json = file_get_contents('php://input');
      $obj = json_decode($json,true);

      $nom = $obj['nom'];
      $description = $obj['description'];
      $cible =  $obj['cible'];
      $prevente = $obj['prevente'];
      $dateD = $obj['dateD'];
      $dateF = $obj['dateF'];
      $asso = $obj['asso'];

      $result = $db->prepare("INSERT INTO Events(Nom, description, dateDebut, dateFin, preventesSurAppli, cible, asso) VALUES(:nom, :description, :dateD, :dateF, :prevente, :cible, :asso)");
      $result->execute(array('nom' => $nom,
                            'description' => $description,
                            'dateD' => $dateD,
                            'dateF' => $dateF,
                            'prevente' => $prevente,
                            'cible' => $cible,
                            'asso' => $asso
                            ));

      echo($nom);
   }

?>
