# LIRI Bot

### Overview

LIRI is like iPhone's SIRI, however, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

### Resources

In addition to using the Twitter, Spotify and OMDB APIs, these Node packages were crucial in completing the requests:

   * [Twitter](https://www.npmjs.com/package/twitter)
   
   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
   
   * [Request](https://www.npmjs.com/package/request)

     * Used to grab data from [OMDB API](http://www.omdbapi.com)

   * [DotEnv](https://www.npmjs.com/package/dotenv)

     * Used to hide Twitter and Spotify API keys

### Liri Commands

1. `node liri.js my-tweets`

![Alt Text](http://g.recordit.co/RL06tonHjO.gif)

2. `node liri.js spotify-this-song '<song name here>'`

![Alt Text](http://g.recordit.co/Y0xta5wtdc.gif)

3. `node liri.js movie-this '<movie name here>'`

![Alt Text](http://g.recordit.co/DIhhzKFBnu.gif)

4. `node liri.js do-what-it-says`
   
![Alt Text](http://g.recordit.co/Ykc4EbyHMB.gif)