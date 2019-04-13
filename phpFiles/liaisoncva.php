<?php
  include("authConfig.php");

   if($_SERVER["REQUEST_METHOD"] == "POST") {
      $json = file_get_contents('php://input');
      $obj = json_decode($json,true);

      #$myemail = mysql_real_escape_string($db, $obj['email']);
      #$mypassword = mysql_real_escape_string($db, $obj['password']);
      #$mycode = mysql_real_escape_string($db, $obj['code']);
      $cva = $obj['cva'];
      $nom = $obj['nom'];
      $prenom = $obj['prenom'];
      $email = $obj['email'];

      $result = $db->prepare("SELECT num_cva FROM achats_cva WHERE nom = :nom and prenom = :prenom and num_cva = :cva");
      $result->execute(array('cva' => $cva,
                              'prenom' => $prenom,
                              'nom' => $nom
                            ));
      if($data = $result->fetch()) {
        $result = $db->prepare("UPDATE All_Users SET num_cva = :cva WHERE email = :email");
        $result->execute(array('email' => $email,
                                'cva' => $cva,
                              ));
        echo $cva;
      }
      else {
        echo 0;
      }

    }

   function _throw_error(){
     $MSG = 'Erreur' ;
     $json = json_encode($MSG);
     echo $json ;
     exit(0);
   }
   function _throw_less_than_week(){
     $MSG = 'Erreur&&&LTW' ;
     $json = json_encode($MSG);
     echo $json ;
     exit(0);
   }
?>
