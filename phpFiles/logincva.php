<?php
  include("authConfig.php");

   if($_SERVER["REQUEST_METHOD"] == "POST") {
      $json = file_get_contents('php://input');
      $obj = json_decode($json,true);

      #$myemail = mysql_real_escape_string($db, $obj['email']);
      #$mypassword = mysql_real_escape_string($db, $obj['password']);
      #$mycode = mysql_real_escape_string($db, $obj['code']);
      $myemail = $obj['email'];
      $mypassword = $obj['password'];
      if(_test_mdp($mypassword) && _test_username($myemail)){

        //$sql = "SELECT num_cva, nom, prenom, ecole, code, timestmp FROM cva_account WHERE num_cva = '$myusername' and password = '$mypassword'";
        //$sql = "SELECT Email, num_cva, Nom, Prenom, Ecole FROM All_Users WHERE Email = '$myemail' and password = '$mypassword'";
        //$result = mysqli_query($db,$sql);
        //$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
        //$count = mysqli_num_rows($result);
        $result = $db->prepare("SELECT email, num_cva, Nom, Prenom, Ecole, password, asso FROM All_Users WHERE email = :email");
        $result->execute(array('email' => $myemail));
        $count = 0;
        while($current_row = $result->fetch()){
          $row = $current_row;
          $count += 1;
        }
        //echo $row;
        // If result matched $myusername and $mypassword, table row must be 1 row
        if($count == 1) {
          if(password_verify($mypassword, $row["password"])) {
            $json = json_encode($row);
            echo $json;
          }
          else {
            echo 0;
          }
        }else {
          echo 1;
        }
      }else{
        echo "Invalides";
        _throw_error();
      }
   }
   function _test_mdp ( $string ) {
     //CONDITIONS DE VALIDITE
     //return strlen($string) == 8; //8 caractères dans le mdp
       return 1;
   }
   function _test_username ( $string ) {
     #return !preg_match('/[^\d]/', $string); //s'il y a que des chiffres
     return 1;
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
