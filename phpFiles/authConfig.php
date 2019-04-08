<?php
try
{
$db = new PDO('mysql:host=192.168.0.11;dbname=cercle;charset=utf8', 'root', '');
//$db = new PDO('mysql:host=172.20.10.10;dbname=cercle;charset=utf8', 'root', '');
}
catch (Exception $e)
{
     die('Erreur : ' . $e->getMessage());
}
?>
