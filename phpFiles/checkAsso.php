<?php
  include("authConfig.php");

   if($_SERVER["REQUEST_METHOD"] == "POST") {
      $json = file_get_contents('php://input');
      $obj = json_decode($json,true);

      $myemail = $obj['email'];
      $result = $db->prepare("SELECT asso FROM All_Users WHERE email = :email");
      $result->execute(array('email' => $myemail));
      $count = 0;
      while($current_row = $result->fetch()){
        $row = $current_row;
        $count += 1;
      }
      if($count == 1) {
          $json = json_encode($row);
          echo $row['asso'];
        }
        else {
          echo -1;
        }
      }else {
        echo -2;
      }
?>
