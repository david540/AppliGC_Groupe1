<?php
    include("authConfig.php");
    //$sql = "SELECT Email, num_cva, Nom, Prenom, Ecole FROM All_Users WHERE Email = '$myemail' and password = '$mypassword'";
    //$result = mysqli_query($db,$sql);
    //$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
    //$count = mysqli_num_rows($result);
    $result = $db->prepare("SELECT Email, num_cva, Nom, Prenom, Ecole FROM All_Users WHERE Email = :email and password = :pass");
    $result->execute(array('email' => "a",
                            'pass' => "b"));
    $count = 0;
    while($current_row = $result->fetch()){
      $row = $current_row;
      $count += 1;
    }
    echo "\n" . $row['num_cva'];
?>
