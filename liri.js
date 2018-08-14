// Require and configure dotenv
require("dotenv").config();

// Import npm packages
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");


// Import keys
var keys = require("./keys");

// Import FS package
var fs = require("fs");

// Input variables
var command = process.argv[2];
var input = process.argv;
var searchQuery = "";
// Loop to create multi-word search query
for (var i = 3; i < input.length; i++) {

    if (i > 3 && i < input.length) {
  
      searchQuery = searchQuery + "+" + input[i];
  
    }
  
    else {
  
      searchQuery += input[i];
  
    }
  }
  


// Main function
switch (command) {
	case "my-tweets":
	getTweets(searchQuery);
	break;

	case "spotify-this-song":
	getSong(searchQuery);
	break;

	case "movie-this":
	movie(searchQuery);
	break;

	case "do-what-it-says":
	doIt();
	break;
};




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
var spotify = new Spotify(keys.spotify);
var songName = searchQuery;

function getSong() {
    if (songName === undefined) {
        songName = "The Sign";
    } else {

spotify.search (
    {
        type: "track", 
        query: songName
    }, 
    function(err, data) {
        if (err) {
            console.log("Error occurred: " + err);
            return;
        }

        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("Artist(s): " + songs[i].artists.mpa(getArtistNames));
            console.log("Song Name: " + songs[i].name);
            console.log("Preview Link: " + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name);
            console.log("-------------------------------");
        }
    }
)};
}

// OMDB
function movie() {
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
	fs.readFile('random.txt', "utf8", function(error, data){

		if (error) {
    		return console.log(error);
  		}

		var dataArr = data.split(",");
		if (dataArr[0] === "spotify-this-song") {
			var songCheck = dataArr[1].slice(1, -1);
			spotify(songCheck);
		} else if (dataArr[0] === "my-tweets") {
			var tweetName = dataArr[1].slice(1, -1);
			twitter(tweetName);
		} else if(dataArr[0] === "movie-this") {
			var movieTitle = dataArr[1].slice(1, -1);
			movie(movieTitle);
		} 
		
  	});

};