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

    $idEcole = $_GET["idEcole"];
    if($idEcole == NULL){
      exit();
    }
    $conn = new PDO("mysql:host=$HostName;dbname=$DatabaseName;charset=utf8", $HostUser, $HostPass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT id,nomassoc FROM users WHERE IdEcole=:idEcole");

    $stmt->execute(array('idEcole' => $idEcole
                          ));
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
