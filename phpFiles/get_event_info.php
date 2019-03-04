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
    if($_GET["assos"] != null){
      $conditions = str_replace(";", " OR idCibleAsso=", $_GET["assos"]);
      if(!preg_match('/[^A-Za-z0-9= ]/', $conditions)){
        $stmt = $conn->prepare("SELECT * FROM event WHERE idCibleAsso=".$conditions);
      }
      else{
        exit("Requete invalide");
      }
    }else{
      $stmt = $conn->prepare("SELECT * FROM event");
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
