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

// Get [FRESH] posts from a specific subreddit
router.get('/search/:subreddit', function(req, res) {
  var albums = [];
  var eps = [];
  var mixtapes = [];
  var videos = [];
  var singles = [];
  var other =[];

  const options = {
    subreddit: req.params.subreddit,
    query: "[FRESH ",
    sort: "relevance",
    time: "week"
  }

  // Sort FRESH postsby type
  r.search(options).then(response => {
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
    var results =  {
      albums: albums,
      eps: eps,
      mixtapes: mixtapes,
      videos: videos,
      singles: singles,
      other: other
    }
    res.json(results);
  });
});

// Get [FRESH] posts from all subreddits
router.get('/search', function(req, res) {
  var albums = [];
  var eps = [];
  var mixtapes = [];
  var videos = [];
  var singles = [];
  var other =[];

  var allOptions = [
    {
      subreddit: "HipHopHeads",
      query: "[FRESH ",
      sort: "relevance",
      time: "week"
    }
    ,{
      subreddit: "RnBHeads",
      query: "[FRESH ",
      sort: "relevance",
      time: "week"
    }
    ,{
      subreddit: "rnb",
      query: "[FRESH ",
      sort: "relevance",
      time: "week"
    }
    ,{
      subreddit: "PopHeads",
      query: "[FRESH ",
      sort: "relevance",
      time: "week"
    }
    ,{
      subreddit: "indieheads",
      query: "[FRESH ",
      sort: "relevance",
      time: "week"
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
