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

      $result = $db->prepare("INSERT INTO Events(Nom, description, dateDebut, dateFin, preventesSurAppli, asso, idEcole) VALUES(:nom, :description, :dateD, :dateF, :prevente, :asso, :cible)");
      $result->execute(array('nom' => $nom,
                            'description' => $description,
                            'dateD' => $dateD,
                            'dateF' => $dateF,
                            'prevente' => $prevente,
                            'asso' => $asso,
                            'cible' => $cible
                            ));

      echo($nom);
   }

?>
