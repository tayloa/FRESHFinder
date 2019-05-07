require('dotenv').config();
const router = require('express').Router();
const snoowrap = require('snoowrap');

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
//   subreddit: "indieheads",
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

var options = {
  client_id: process.env.client_id,
	client_secret: process.env.client_secret,
	username: process.env.username,
	password: process.env.password,
  userAgent: "FRESHBot"
}
const r = new snoowrap(options);

// See any recent leaks
router.get('/search/:subreddit/leaks', function(req, res) {
  // [LEAK]
});

router.get('/search/:subreddit', function(req, res) {
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
        albums.push({ title: post.title, link: post.url});
      }
      else if (post.title.includes("MIXTAPE")) {
        mixtapes.push({ title: post.title, link: post.url});
      }
      else if (post.title.includes("EP")) {
        eps.push({ title: post.title, link: post.url});
      }
      else if (post.title.includes("VIDEO")) {
        videos.push({ title: post.title, link: post.url});
      }
      else if (post.title.includes("[FRESH]")) {
        songs.push({ title: post.title, link: post.url});
      }
      // Unknown type
      else {
        other.push({ title: post.title, link: post.url});
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
    res.json(results);
  });
});

module.exports = router;
