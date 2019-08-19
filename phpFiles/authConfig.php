<?php
try
{
//$db = new PDO('mysql:host=192.168.0.13;dbname=cercle;charset=utf8', 'root', '');
$db = new PDO('mysql:host=mysql51-152.bdb;dbname=grandcerinpl;charset=utf8', 'grandcerinpl', 'App18InP');
}
catch (Exception $e)
{
     die('Erreur : ' . $e->getMessage());
}
?>
