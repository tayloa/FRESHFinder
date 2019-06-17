require('dotenv').config();
const router = require('express').Router();
const snoowrap = require('snoowrap');

var options = {
  client_id: process.env.client_id,
	client_secret: process.env.client_secret,
	username: process.env.username,
	password: process.env.password,
  userAgent: "FRESHBot"
}
const r = new snoowrap(options);
const timeOptions = ["hour", "day", "week", "month", "year", "all"];

// Get [FRESH] posts from all subreddits
router.get('/search/:time?', function(req, res) {
  var albums = [];
  var eps = [];
  var mixtapes = [];
  var videos = [];
  var singles = [];
  var other =[];
  var time = req.params.time;
  if (!time || (!timeOptions.includes(time))) {
    time = "week";
  }

  var allOptions = [
    {
      subreddit: "HipHopHeads",
      query: "[FRESH ",
      sort: "relevance",
      time: time
    }
    ,{
      subreddit: "RnBHeads",
      query: "[FRESH ",
      sort: "relevance",
      time: time
    }
    ,{
      subreddit: "rnb",
      query: "[FRESH ",
      sort: "relevance",
      time: time
    }
    ,{
      subreddit: "PopHeads",
      query: "[FRESH ",
      sort: "relevance",
      time: time
    }
    ,{
      subreddit: "indieheads",
      query: "[FRESH ",
      sort: "relevance",
      time: time
    }
  ];

  // Make search request to Reddit api for FRESH posts and sort by type
  async function getPosts(option) {

    // Make search request to Reddit api
    await r.search(option).then(response => {

      // Sort FRESH posts by type
      response.forEach(function(post) {
        if (post.title.includes("ALBUM]")) {
          albums.push(post);
        }
        else if (post.title.includes("MIXTAPE]")) {
          mixtapes.push(post);
        }
        else if (post.title.includes("EP]")) {
          eps.push(post);
        }
        else if (post.title.includes("VIDEO]")) {
          videos.push(post);
        }
        else if (post.title.includes("[FRESH]")) {
          singles.push(post);
        }
        // Unknown type
        else {
          other.push(post);
        }
      });

      new Promise(resolve => setTimeout(resolve, 300));
    });
}

  // Process all request options
  async function processOptions(array) {

    // map array to promises
    const promises = array.map(getPosts);

    // wait until all promises are resolved
    await Promise.all(promises);

    var results =  {
      albums: albums,
      eps: eps,
      mixtapes: mixtapes,
      videos: videos,
      singles: singles,
      other: other
    }

    // Send results to user
    res.json(results);
  }

  // Run all request options and send the results
  processOptions(allOptions);

});

module.exports = router;
