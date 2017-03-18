<?php
    $host = "138.110.86.176";
    $db_name = "scribeSQLDatabase";
    $username = "michael";
    $password = "michael";
        $port = 3306;

    // Connect to db
    $db = new MySQLi($host, $username, $password, $db_name, $port);
?>
