<?php
  include("authConfig.php");

   if($_SERVER["REQUEST_METHOD"] == "POST") {
      $json = file_get_contents('php://input');
      $obj = json_decode($json,true);

      $asso = $obj['asso'];
      $result = $db->prepare("SELECT nomassoc, idEcole, droitInp FROM users WHERE id = :asso");
      $result->execute(array('asso' => $asso));
      $count = 0;
      while($current_row = $result->fetch()){
        $row = $current_row;
        $count += 1;
      }
      if($count == 1) {
        //  $json = json_encode($row);
          echo $row['nomassoc'] . "|" . $row['idEcole'] . "|" . $row['droitInp'];
        }
        else {
          echo -1;
        }
      }else {
        echo -2;
      }
?>
