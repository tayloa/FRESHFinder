'use strict';
require('dotenv').config();
const express    = require('express');
const axios      = require('axios');
const snoowrap = require('snoowrap');
const port = 3000;
const app = express();

var options = {
  client_id: process.env.client_id,
	client_secret: process.env.client_secret,
	username: process.env.username,
	password: process.env.password,
  userAgent: "FRESHBot"
}
const r = new snoowrap(options);

// See any recent leaks
app.get('/search/:subreddit/leaks', function(req, res) {
  // [LEAK]
});

app.get('/search/:subreddit', function(req, res) {
  var albums = [];
  var eps = [];
  var mixtapes = [];
  var videos = [];
  var songs = [];
  var other =[];
  const options = {
    subreddit: req.params.subreddit,
    query: "[FRESH ",
    sort: "relevance",
    time: "week"
  }
  r.search(options).then(response => {
    response.forEach(function(post) {
      if (post.title.includes("ALBUM")) {
        albums.push(post.title);
      }
      else if (post.title.includes("MIXTAPE")) {
        mixtapes.push(post.title);
      }
      else if (post.title.includes("EP")) {
        eps.push(post.title);
      }
      else if (post.title.includes("VIDEO")) {
        videos.push(post.title);
      }
      else if (post.title.includes("[FRESH]")) {
        songs.push(post.title);
      }
      // Unknown type
      else {
        other.push(post.title);
      }
    });
    var results =  {
      albums: albums,
      eps: eps,
      mixtapes: mixtapes,
      videos: videos,
      songs: songs,
      other: other
    }
    console.log(results);
    res.json(results);
  });
});

// console.log(options);
// const searchOptions = {
//   subreddit: "HipHopHeads",
//   query: "[FRESH ",
//   sort: "relevance",
//   time: "week"
// }
// const searchOptions = {
//   subreddit: "RnBHeads",
//   query: "[FRESH ",
//   sort: "relevance",
//   time: "week"
// }
// const searchOptions = {
//   subreddit: "rnb",
//   query: "[FRESH ",
//   sort: "relevance",
//   time: "week"
// }
// const searchOptions = {
//   subreddit: "PopHeads",
//   query: "[FRESH ",
//   sort: "relevance",
//   time: "week"
// }
// const searchOptions = {
//   subreddit: "mathrock",
//   query: "[FRESH ",
//   sort: "relevance",
//   time: "week"
// }

const server = app.listen((process.env.port || 3000), () => console.log(`[FRESH]FINDER is listening on port ${port}!`))
