let MovieArray = [];

let MovieObject = function (name, status, date) {
    this.name = name; //name of the movie
    this.status = status; //movie's watch status--Finished, Planning, Paused, Rewatching
    this.date = date; //movie's release date
}

MovieArray.push ( new MovieObject("Dune: Part Two", "Planning", "3/1/24")  );
MovieArray.push ( new MovieObject("G Minus One", "Watched", "12/1/23")  );
MovieArray.push ( new MovieObject("The Boy and the Heron", "Watched", "12/8/23")  );

let selectedStatus = "";

// code runs immediately
//================================================================

// runs when dom is loaded
document.addEventListener("DOMContentLoaded", function (event) {

    createList();

    //each time a new movie is added
    document.getElementById("buttonAdd").addEventListener("click", function () {
        //update the MovieArray by pushing a new movie object with the following parameters
        MovieArray.push ( new MovieObject(document.getElementById("nameInput").value, selectedStatus,
        document.getElementById("dateInput").value ) );
        //Grabs the name, watch status, and release date, respectively
        
        document.getElementById("nameInput").value = ""; //reset the Add a Movie textbox
        document.getElementById("dateInput").value = ""; //reset the Add a Movie textbox

        createList();
    });

    //used for finding the watch status from the drop down menu on line 100 of index.html
    $(document).bind("change", "#select-status", function (event, ui) {
        selectedStatus = document.getElementById("select-status").value;
    });

});


//======================================
// creates the movielist from the MovieArray to populate the Movie Watchlist Page
function createList() {
    // clear prior data
    var myul = document.getElementById("myul");
    myul.innerHTML = "";

    MovieArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
          // added data-role="listview" to the ul in the html
        li.innerHTML = element.date + ":  " + element.status + "   " + element.name;
        myul.appendChild(li);
    });
};
