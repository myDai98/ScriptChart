<?php
//    ChromePhp::log("text") to print to console if uncommented:
    include 'ChromePhp.php';

    //generates an associative array containing manuscript and year
    while($throw_query = $result->fetch_assoc()) {
        //creates variables to add to associative array
        $manuscript = $throw_query['Manuscript_no'];
        $date = $throw_query['Date'];

        //adds elements to array
        //elements can be accessed like: foreach($manu as $m=>$m_date)
        $manu[$manuscript] = $date;
    }

    //turns numbers into one int value (averages ranges)
    foreach($manu as $m=>$m_date) {

        //get rid of spaces
        $fm = str_replace(" ", "", $m_date);
        $manu[$m] = $fm;

        //get length
        $l = strlen($m_date);

        if ($l == 3 || $l == 4 || $l==5) {
            //round value
            $new = intval($m_date);
            $manu[$m] = $new;
        }


    }

    //deletes values we don't want displayed, based on criteria
    foreach($manu as $m=>$m_date) {

//        number.replaceAll("[^\\dxX]+", "");
//        preg_replace()
//        preg_replace("/[^0-9,.]/", "", $testString);
//
//        $m_date_new = preg_replace("/[^0-9-]/", "", $m_date);
//        ChromePhp::log($m_date);
        //regex to deal with cases like ca.100-120
        //removes everything except numbers and -
        $manu[$m] = preg_replace("/[^0-9-]/", "", $m_date);

        if (strpos($m_date, '-') != false) {
            $index = strrpos($manu[$m], "-");
            $firstValue = substr($manu[$m], 0, $index);
            $index++;
            $secondValue = substr($manu[$m], $index);

            if(($firstDate < $firstValue || $firstDate > $secondValue)
              && ($secondDate < $firstValue || $secondDate > $secondValue)) {
                if($firstDate < $firstValue && $secondDate > $secondValue) {
                    //range is completely inside values
                }
                else {
                    unset($manu[$m]);
                }
            }
        }

        else if($m_date < $firstDate || $m_date > $secondDate) {
            if($m_date != "") {
                unset($manu[$m]);
            }
        }
    }

    foreach ($manu as $m => $m_date) {
        $both = $m . ": Date: " . $m_date;

        if (strpos($m_date, '-') != false) {
            $index = strrpos($manu[$m], "-");
            $firstValue = substr($manu[$m], 0, $index);
            $index++;
            $secondValue = substr($manu[$m], $index);

            $average = ($firstValue + $secondValue) / 2;
//            ChromePhp::log($average);

            $finalManuscriptList[$both] = $average;
        }

        else {
            $finalManuscriptList[$both] = $m_date;
        }
    }

//    foreach ($finalManuscriptList as $name => $average) {
//        ChromePhp::log($name);
//        ChromePhp::log($average);
//    }



    //sort by criteria
    if($sortChoice=="num") {
        asort($finalManuscriptList);
    }
    else {
        ksort($finalManuscriptList);
    }

//    ChromePhp::log("test");
    foreach ($finalManuscriptList as $name => $average) {
//        ChromePhp::log($name);
//        ChromePhp::log($average);
    }

?>
