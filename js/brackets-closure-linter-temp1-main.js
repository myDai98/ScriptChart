var AJAX;
var DEBUG = false;
var firstTriangle = "open";
var secondTriangle = "open";


//General function to define AJAX global variable
function setUpAjax(divID){
    //Browser Support Code (Necessary)
    try{
        // Opera 8.0+, Firefox, Safari
        AJAX = new XMLHttpRequest();
    }catch (e){
        // Internet Explorer Browsers
        try{
            AJAX = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e) {

            try{
                AJAX = new ActiveXObject("Microsoft.XMLHTTP");
            }catch (e){
                // Something went wrong
            alert("AJAX error");
            return false;
            }
        }
    }

    // Create a function that will receive data
    // sent from the server and will update
    // div section in the same page.
    AJAX.onreadystatechange = function(){

        if(AJAX.readyState == 4){
            var ajaxDisplay = document.getElementById(divID);
            ajaxDisplay.innerHTML = AJAX.responseText;
        }
    };
}


function flipFirst() {
    if(firstTriangle == "open") {
        document.getElementById('img').innerHTML = ' <img src="images/closedTriangle.png" width = 15px>';
        firstTriangle = "closed";
    }
    else {
        document.getElementById('img').innerHTML = ' <img src="images/openTriangle.png" width = 15px>';
        firstTriangle = "open";
    }
}

function flipSecond() {
    if(secondTriangle == "open") {
        document.getElementById('img2').innerHTML = ' <img src="../images/closedTriangle.png" width = 15px>';
        secondTriangle = "closed";
    }
    else {
        document.getElementById('img2').innerHTML = ' <img src="../images/openTriangle.png" width = 15px>';
        secondTriangle = "open";
    }
}

//gets search criteria and calls manuscriptOptions
function searchByCriteria(divID) {

    document.getElementById('letterTable').innerHTML = ' <span id="hidden">---Placeholder---</span>  ';
    document.getElementById('img').innerHTML = ' <img src="images/closedTriangle.png" width = 15px>';
    firstTriangle = "closed"

    setUpAjax(divID);

    //pulls date variables from form
    var firstDate = document.getElementById('earliest').value;
    var secondDate = document.getElementById('latest').value;

    //sort Alphabetically or Numerically:
    var sort = document.getElementsByName("sort");
    for(var i = 0; i < sort.length; i++) {
        if(sort[i].checked == true) {
            var sortChoice = sort[i].value;
        }
    }

    //find whether manuscripts without dates should be included
    var dates = document.getElementById("dates");
    var onlyDated = dates.checked;

    //manufactures a range
    if(firstDate == "") {
        firstDate = 0;
    }
    if(secondDate == "") {
        secondDate = 1000000;
    }

    //creates query string to send
    var queryString = "?firstDate=" + firstDate+  "&secondDate=" + secondDate + "&onlyDated=" + onlyDated + "&sortChoice=" + sortChoice;

    if(DEBUG) { console.log(queryString); }

    //uses AJAX to call manuscriptOptions.php, sending query string
    AJAX.open("GET", "php/manuscriptOptions.php" + queryString, true);
    AJAX.send(null);
}

//generates table of images based on chosen manuscripts
function generateTable(){

    document.getElementById('letterTable').innerHTML = ' <span id="hidden">---Placeholder---</span>  ';
    document.getElementById('img2').innerHTML = '<img src="../images/openTriangle.png" width = 15px>';
    secondTriangle = "open";

    //b/w or color images (default is color (raw))
    var images = document.getElementsByName("images");
    var imageChoice = "raw"; //set default value
    //finds selected radio button (bw or color)
    for(var i = 0; i < images.length; i++) {
        if(images[i].checked == true) {
            var imageChoice = images[i].value;
        }
    }

    //determines size of images, default is medium (200px)
    var sizes = document.getElementsByName("size");
    var sizeChoice = "medium"; //set default value
    //finds selected radio button (bw or color)
    for(var i = 0; i < sizes.length; i++) {
        if(sizes[i].checked == true) {
            var sizeChoice = sizes[i].value;
        }
    }

    //pulls selected manuscripts and creates array chosenManuscripts
    var chosenManuscripts = getChosenValuesFromList("manuscripts");

    //pulls letters and creates array chosenLetters
    var chosenLetters = getChosenValuesFromList("letters");

    //create the table with manuscrips, letters, and images
    document.getElementById('letterTable').innerHTML = '  ';
    chosenManuscripts.splice(0, 0, ""); //formatting
    var body = document.getElementById('letterTable');
    var tableDiv = document.createElement('div');
    tableDiv.style.width = "100%";
    tableDiv.style.height = "100%";
    tableDiv.style.overflow = "scroll";
    var tbl  = document.createElement('table');
    tbl.style.backgroundColor = "#f0eff0";
    tbl.style.border = "1px solid black";

    for(var k = 0; k < chosenManuscripts.length; k++) {
        var th = document.createElement("th");
        th.style.border = "1px solid black";
        var title = chosenManuscripts[k] + " ";
        var name = title.slice(0, title.indexOf(":"));
        var date = title.slice(title.indexOf(":")+2);
        th.appendChild(document.createTextNode(name));
        th.appendChild(document.createElement('br'));
        th.appendChild(document.createElement('br'));
        th.appendChild(document.createTextNode(date));
        th.style.textAlign = "center";
        tbl.appendChild(th);
    }

    for(var i = 0; i < chosenLetters.length; i++) {
        var tr = tbl.insertRow();
        //letter names
        var td2 = tr.insertCell();
        td2.style.border = "1px solid black";
        td2.appendChild(document.createTextNode(chosenLetters[i]));
        tr.appendChild(td2);


        for(var j = 0; j < chosenManuscripts.length; j++){
            if(j != 0) {
                var str = chosenManuscripts[j];
                var formatted = str.replace(/ /g, "_");
                var res = formatted.split(":");

                //creates fileName to pull image
                var imageFileName = "images/" + imageChoice + "/" + chosenLetters[i] + "_" + res[0] + ".png";

                var td = tr.insertCell();
                var img=document.createElement("img");
                img.setAttribute('src', imageFileName.toLowerCase());



                td.appendChild(img);
                td.style.border = "1px solid black";
                td.style.textAlign = "center";


                if(sizeChoice=="small") {
//                    img.setAttribute('width', '40%');

                    $( "img" ).each( function() {
                        var $img = $( this );
                        $img.width( $img.width() * .2 );
                    });
                }
                else if (sizeChoice =="medium") {
//                    img.setAttribute('width', '60%');
                    $( "img" ).each( function() {
                        var $img = $( this );
                        $img.width( $img.width() * .5 );
                    });
                }
                else {
//                    img.setAttribute('width', '100%');
                    $( "img" ).each( function() {
                        var $img = $( this );
                        $img.width( $img.width()  );
                    });
                }
            }
        }
    }

    tableDiv.appendChild(tbl);
    body.appendChild(tableDiv);
//    body.appendChild(tbl);
}

//function that selects all elements in a particular div (must be multi select box)
function selectAll(div) {
    var m = document.getElementById(div);
    for (var i = 0; i < m.options.length; i++) {
        m.options[i].selected = true;
    }
}

//returns an array of chosen values
function getChosenValuesFromList(divID) {
    var chosenItems = [];
    var itemDropDown = document.getElementById(divID);
    for (var i = 0; i < itemDropDown.options.length; i++) {
        if (itemDropDown.options[i].selected == true) {
            var itemName = itemDropDown.options[i].value;
            chosenItems.push(itemName);
        }
    }

    return chosenItems;
}
