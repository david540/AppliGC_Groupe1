<?php

// Importing DBConfig.php file.
include 'DBConfig.php';

class TableRows extends RecursiveIteratorIterator {
    function __construct($it) {
        parent::__construct($it, self::LEAVES_ONLY);
    }

    function current() {
        return parent::current()."&&&";
    }

    function beginChildren() {
    }

    function endChildren() {
    }
}
// Creating connection.
try {
    $conn = new PDO("mysql:host=$HostName;dbname=$DatabaseName;charset=utf8", $HostUser, $HostPass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if($_GET["idEcole"] != null){
      $idEcole = intval($_GET["idEcole"]);
      if($idEcole <= 9 && $idEcole > 0){
        $stmt = $conn->prepare("SELECT * FROM Events WHERE idEcole=". strval($idEcole). " OR idEcole=0");
      }
      else{
        exit("Requete invalide");
      }
    }else{
      $stmt = $conn->prepare("SELECT * FROM Events");
    }
    $stmt->execute();
    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $string = "";
    foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) {
      if ($k === "id")
        $string.="|||";
      $string.=$v;
    }
    echo json_encode(utf8_encode($string));
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>
