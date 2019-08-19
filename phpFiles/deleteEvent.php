<?php
  include("authConfig.php");

   if($_SERVER["REQUEST_METHOD"] == "POST") {
      $json = file_get_contents('php://input');
      $obj = json_decode($json,true);

      $email = $obj['email'];
      $password = $obj['password'];
      $assoEvent =  $obj['asso'];
      $nomEvent = $obj['nom'];

      $result = $db->prepare("SELECT asso FROM All_Users WHERE email = :email AND password = :password");
      $result->execute(array('email' => $email, 'password' => $password));
      $count = 0;
      while($current_row = $result->fetch()){
        $row = $current_row;
        $count += 1;
      }
      if($count == 1 && $row['asso'] == $assoEvent) {
        //  $json = json_encode($row);

        $result = $db->prepare("DELETE FROM Events WHERE Nom = :nomEvent AND asso = :assoEvent");
        $result->execute(array('nomEvent' => $nomEvent,
                              'assoEvent' => $assoEvent
                              ));
        echo "1";

      }
      else{
        echo "0";
      }
    }


?>
