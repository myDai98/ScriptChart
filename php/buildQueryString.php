<?php
    // Retrieve data from Query String
    $firstDate = $_GET['firstDate'];
    $secondDate = $_GET['secondDate'];
    $onlyDated = $_GET['onlyDated'];
    $sortChoice = $_GET['sortChoice'];


    //build query
    $query = 'SELECT * FROM manuscripttable';

    //selects only dated manuscripts
    if ($onlyDated == "true") {
        $query .= " WHERE Date NOT IN ('')";
    }

    //runs query
    $result = $db->query($query);
    $manu = array();


?>
