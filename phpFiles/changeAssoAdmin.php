<?php
  include("authConfig.php");

   if($_SERVER["REQUEST_METHOD"] == "POST") {
      $json = file_get_contents('php://input');
      $obj = json_decode($json,true);

      $email = $obj['email'];
      $password = $obj['password'];
      $asso =  $obj['asso'];

      $result = $db->prepare("SELECT code FROM All_Users WHERE email = :email AND password = :password");
      $result->execute(array('email' => $email, 'password' => $password));
      $count = 0;
      while($current_row = $result->fetch()){
        $row = $current_row;
        $count += 1;
      }
      $code = $row['code'];
      if($count == 1 && $code > 0) {
        //  $json = json_encode($row);

        $result = $db->prepare("SELECT IdEcole, nomassoc FROM users WHERE id = :asso");
        $result->execute(array('asso' => $asso));
        $count = 0;
        while($current_row = $result->fetch()){
          $row = $current_row;
          $count += 1;
        }
        if($count == 1 && intval($row['IdEcole']) == intval($code) || $code == 10) {
          //  $json = json_encode($row);

          $result = $db->prepare("UPDATE All_Users SET asso = :asso, IdEcole = :IdEcole WHERE email = :email AND password = :password");
          $result->execute(array('asso' => $asso,'IdEcole' => intval($row['IdEcole']), 'email' => $email, 'password' => $password));
          echo $row['nomassoc'];
        }else{
          echo "0";
        }

      }
      else{
        echo "0";
      }
    }


?>
