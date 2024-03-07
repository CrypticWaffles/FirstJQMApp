var express = require('express');
var router = express.Router();

//Create Movie array
let serverArray = [];


//Define Movie Objects
let MovieObject = function (name, status, date, runtime, picURL) {
    this.name = name; //name of the movie
    this.status = status; //movie's watch status--Finished, Planning, Paused, Rewatching
    this.date = date; //movie's release date
    this.runtime = runtime; //movie's runtime, in minutes
    this.picURL = picURL; //URL from the web of a movie poster
    this.ID = Math.random().toString(16).slice(5);
}

var fs = require("fs");

let fileManager = {
  read: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    let goodData = JSON.parse(rawdata);
    serverArray = goodData;
  },

  write: function() {
    let data = JSON.stringify(serverArray);
    fs.writeFileSync('objectdata.json', data);
  },

  validData: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    console.log(rawdata.length);
    if(rawdata.length < 1) {
      return false;
    }
    else {
      return true;
    }
  }
};

if(!fileManager.validData()) {
  //if objectdata.json is empty, Populate Movie Array with the following
  serverArray.push ( new MovieObject("Dune: Part Two", "Planning", "3/1/24", "165 minutes", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.kinocheck.com%2Fi%2Fj65blgtnvt.jpg&f=1&nofb=1&ipt=20b06b232a0d146c972b4265be604cfba14975e8d46d1ba33701c41968599699&ipo=images")  );
  serverArray.push ( new MovieObject("G Minus One", "Watched", "12/1/23", "125 minutes", "https://waxworkrecords.com/cdn/shop/files/Godzilla-Minus-One_Front-Cover_740x.jpg?v=1705441477")  );
  serverArray.push ( new MovieObject("The Boy and the Heron", "Watched", "12/8/23", "124 minutes", "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/192/2023/10/06110031/zbMRm6P6wPe9SQ6qJ7ZTAvCMS6e-683x1024.jpg")  );
  fileManager.write();
}
else {
  fileManager.read(); // do have prior movies so load up the array
}

/* GET home page. */
router.get('/', function(req, res, next) {
  fileManager.read();
  res.sendFile('index.html');
});

/* GET all movie data */
router.get('/getAllMovies', function(req, res) {
  res.status(200).json(serverArray);
});

/*Add new Movies */
router.post('/AddMovie', function(req, res) {
  const newMovie = req.body;
  serverArray.push(newMovie);
  fileManager.write();
  res.status(200).json(newMovie);
});

/* Delete movie */


module.exports = router;
