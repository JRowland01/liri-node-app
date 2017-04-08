var spotify = require('spotify');

// spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }

//     // Do something with 'data'
//     console.log(data.tracks.items[0]); 
// });



    var searchTitle = "adore";
    spotify.search({ type: 'track', query: searchTitle }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        var albumTrack = data.tracks.items;

        for (i = 0; i < albumTrack.length; i++) {
            console.log("Artist: " + albumTrack[i].artists.map((a) => a.name));
            console.log("Track Name: " + albumTrack[i].name);
            console.log("Preview Link: " + albumTrack[i].preview_url);
            console.log("Album: " + albumTrack[i].album.name);
            console.log("");
        }

        


    });
