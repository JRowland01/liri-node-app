var keys = require("./keys.js");
var twitter = require("twitter");
var omdbNode = require("omdb");
var spotify = require("spotify");
var fs = require("fs");
var querystring = require("querystring");
var request = require("request");


// This variable allows the command line arguments to be entered.
var liriInput = process.argv[2];

//If no commands are entered, Liri will state the following.

if (liriInput === undefined) {
    console.log("I'm listening...");
    return;
}

switch (liriInput) {
    case "my-tweets":
        mTweets();
        break;

    case "spotify-this-song":
        myPlayList(process.argv[3]);
        break;

    case "movie-this":
        movieInfo(process.argv[3]);
        break;

    case "do-what-it-says":
        randomFile(process.argv[3]);
        break;
}

//My last 20 tweets will be displayed through this function called mTweets.

function mTweets() {

    var client = new twitter({
        consumer_key: keys.consumer_key,
        consumer_secret: keys.consumer_secret,
        access_token_key: keys.access_token_key,
        access_token_secret: keys.access_token_secret,
    });

    var params = {
        screen_name: 'Mia____C',
        count: '20',
        trim_user: false,
    }

    client.get('statuses/user_timeline', params, function(error, timeline, response) {
        if (!error) {
            for (tweet in timeline) {
                var tDate = new Date(timeline[tweet].created_at);

                console.log("\n\n" + tDate.toString().slice(0, 24));
                console.log(timeline[tweet].text);
                console.log("");

            }
        }
    })

}

//Spotify track information to be displayed through the function myPlaylist

function myPlayList(searchTitle) {
    if (searchTitle == undefined) {
        searchTitle = 'The Sign Ace of Base';
    }

    spotify.search({ type: 'track', query: searchTitle }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        var albumTrack = data.tracks.items;

        albumTrack.forEach((track) => {
            var artists = track.artists.map((a) => a.name);
            console.log("\n\nArtists: " + artists.join(", "));
            console.log("Track Name: " + track.name);
            console.log("Preview Link: " + track.preview_url);
            console.log("Album: " + track.album.name);
            console.log("");
        });

    });

};


//A function to retrieve OMDB movie information.

function movieInfo(searchTitle) {
    if (searchTitle == undefined) {
        searchTitle = 'Mr. Nobody';
    }

    var queryProps = {
        t: searchTitle,
        plot: 'full',
        r: 'json',
        tomatoes: true
    };

    var queryUrl = 'http://www.omdbapi.com/?' + querystring.stringify(queryProps);

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            output = ("\n\nTitle:" + JSON.parse(body)['Title'] + "\n\nYear: " + JSON.parse(body)['Released'] + "\n\nIMDB Rating: " + JSON.parse(body)['imdbRating'] + "\n\nCountry: " + JSON.parse(body)['Country'] + "\n\nLanguage: " + JSON.parse(body)['Language'] + "\n\nSynopsis: " + JSON.parse(body)['Plot'] + "\n\nActors: " + JSON.parse(body)['Actors'] + "\n\nRotten Tomatoes Rating: " + JSON.parse(body)['tomatoRating']);
            console.log(output);
        } else {
            console.log("You have encountered an error.");
        }
    });

}

//This function allows track information for "I Want It That Way" to be displayed.

function randomFile() {
    fs.readFile("random.txt", "UTF-8", function(error, data) {


        var dataArr = data.split(',');
        var trackText = dataArr[0];
        switch (trackText) {

            case "spotify-this-song":
                var trackName = "";
                trackName = dataArr[1];
                myPlayList(trackName);
                break;

        }
    });
}
