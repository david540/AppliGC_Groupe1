<?php
  include("authConfig.php");

   if($_SERVER["REQUEST_METHOD"] == "POST") {
      $json = file_get_contents('php://input');
      $obj = json_decode($json,true);

      $myusername = mysqli_real_escape_string($db, $obj['username']);
      $mypassword = mysqli_real_escape_string($db, $obj['password']);
      $mycode = mysqli_real_escape_string($db, $obj['code']);
      if(_test_mdp($mypassword) && _test_username($myusername)){
        
        $sql = "SELECT num_cva, nom, prenom, ecole, code, timestmp FROM cva_account WHERE num_cva = '$myusername' and password = '$mypassword'";
        $result = mysqli_query($db,$sql);
        $row = mysqli_fetch_array($result,MYSQLI_ASSOC);

        $count = mysqli_num_rows($result);

        // If result matched $myusername and $mypassword, table row must be 1 row

        if($count == 1) {
          $MSG = $row['num_cva'] ;
          $MSG .= '&&&';
          $MSG.= $row['nom'] ;
          $MSG .= '&&&';
          $MSG.= $row['prenom'] ;
          $MSG .= '&&&';
          $MSG.= $row['ecole'] ;
          $MSG .= '&&&';
          $MSG.= '1';
          if($row['code'] != $mycode){
            $t = time();
            if($t - $row['timestmp'] > 3600){ //1 semaine en seconde: 3600*24*7
                $newcode = rand(100000000, 999999999);
                $sql = "UPDATE cva_account SET code = '$newcode', timestmp = '$t' WHERE num_cva = '$myusername' and password = '$mypassword'";
                mysqli_query($db,$sql);
                $MSG .= '&&&';
                $MSG .= $newcode;
            }else{
              _throw_less_than_week();
            }
          }
          $json = json_encode($MSG);
          echo $json ;
        }else {
          _throw_error();
        }
      }else{
        _throw_error();
      }
   }
   function _test_mdp ( $string ) {
     //CONDITIONS DE VALIDITE
     return strlen($string) == 8; //8 caractères dans le mdp
   }
   function _test_username ( $string ) {
     return !preg_match('/[^\d]/', $string); //s'il y a que des chiffres
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
