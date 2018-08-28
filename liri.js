// Require and configure dotenv
require("dotenv").config();

// Import npm packages
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");


// Import keys
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);

// Import the FS package for read/write.
var fs = require("fs");

// Input variables
var command = process.argv[2];
var input = process.argv;



// Twitter Search
function getTweets () {
    var client = new Twitter(keys.twitter);
    var params = {
        screen_name: "mirta_ann"
    };
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("Tweet: " + tweets[i].text);
                console.log("");
                console.log("Created at: " + tweets[i].created_at);                           
                console.log("-------------------------------");
            }
        } else {
            console.log(error);
        }
    });
}

// Spotify Search
function getSong(searchQuery) {

    if (!searchQuery) {
        searchQuery = "In My Feelings";
    } 

spotify.search (
    {
        type: "track", 
        query: searchQuery
    }, 
    function(err, data) {
        if (err) {
            console.log("Error occurred: " + err);
            return;
        }

        var songs = data.tracks.items;
            console.log("Artist(s): " + songs[0].artists[0].name);
            console.log("Song Name: " + songs[0].name);
            console.log("Preview Link: " + songs[0].preview_url);
            console.log("Album: " + songs[0].album.name);
            console.log("-------------------------------");
        
    }

)};


// OMDB
var getMovie = function(searchQuery) {
    if (!searchQuery) {
        searchQuery = "Mr. Nobody";}
  var queryUrl = "http://www.omdbapi.com/?t=" + searchQuery + "&y=&plot=short&apikey=trilogy";


  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {    
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
}
});
}

function doIt() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
    
        var dataArr = data.split(",");
    
        if (dataArr.length === 2) {
          pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
          pick(dataArr[0]);
        }
      });
    };


// Switch
var pick = function(command, searchQuery) {
switch (command) {
	case "my-tweets":
	getTweets(searchQuery);
	break;

	case "spotify-this-song":
	getSong(searchQuery);
	break;

	case "movie-this":
	getMovie(searchQuery);
	break;

	case "do-what-it-says":
	doIt();
	break;
};
}

// Function which takes in command line arguments and executes correct function accordingly
var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
  };
  
  // MAIN PROCESS
  // =====================================
  runThis(command, input.slice(3).join(" "));
  
  