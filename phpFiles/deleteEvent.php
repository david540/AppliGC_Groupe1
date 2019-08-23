<?php
  include("authConfig.php");

   if($_SERVER["REQUEST_METHOD"] == "POST") {
      $json = file_get_contents('php://input');
      $obj = json_decode($json,true);

      $email = $obj['email'];
      $password = $obj['password'];
      $assoEvent =  $obj['asso'];
      $idEvent = $obj['id'];

      $result = $db->prepare("SELECT asso FROM All_Users WHERE email = :email AND password = :password");
      $result->execute(array('email' => $email, 'password' => $password));
      $count = 0;
      while($current_row = $result->fetch()){
        $row = $current_row;
        $count += 1;
      }
      echo $row['asso'];
      echo $assoEvent;
      if($count == 1 && $row['asso'] == $assoEvent) {
        //  $json = json_encode($row);

        $result = $db->prepare("DELETE FROM Events WHERE id = :id AND asso = :assoEvent");
        $result->execute(array('id' => $idEvent,
                              'assoEvent' => $assoEvent
                              ));
        echo "1";

      }
      else{
        echo "0";
      }
    }


?>
