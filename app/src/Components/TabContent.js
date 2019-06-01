import React from 'react';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify, faSoundcloud, faYoutube, faApple, faBandcamp } from "@fortawesome/free-brands-svg-icons";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class TabContent extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    // Check if posts need to be sorted
    var posts = this.props.posts;
    var filters = this.props.filters;
    if (posts && filters) {

      if (filters.subs.length > 0) {
        posts = posts.filter(function (post) {
          return filters.subs.indexOf("r/"+post.subreddit) !== -1
        });
      }
      if (filters.score || filters.date) {

        if (filters.score) {

          // Sort by score
          posts.sort(function (a, b) {
            // a and b will be two instances of your object from your list

            // possible return values
            var a1st = -1; // negative value means left item should appear first
            var b1st =  1; // positive value means right item should appear first
            var equal = 0; // zero means objects are equal

            // compare your object's property values and determine their order
            if (b.score > a.score) {
                return b1st;
            }
            else if (a.score > b.score) {
                return a1st;
            }
            else {
                return equal;
            }
          });
        }

        if (filters.date) {

          // Sort by score
          posts.sort(function (a, b) {
            // a and b will be two instances of your object from your list

            // possible return values
            var a1st = -1; // negative value means left item should appear first
            var b1st =  1; // positive value means right item should appear first
            var equal = 0; // zero means objects are equal

            // compare your object's property values and determine their order
            if (b.created_utc > a.created_utc) {
                return b1st;
            }
            else if (a.created_utc > b.created_utc) {
                return a1st;
            }
            else {
                return equal;
            }
          });
        }
      }
    }

    this.state =  {
      posts: posts,
      filters: filters,
      loading: false
    }
  }

  handleClick(e) {
      var index = e.currentTarget.dataset.index;
      this.props.onSelectPost(this.state.posts[Number(index)]);
  }

  render() {
      if (this.state.posts) {

        if (this.state.posts.length === 0) {
          if (this.props.label === "Other") return ( <h1>No unclassified content found.</h1> );
          else {
              return ( <div class="no-content">
                <span>No {this.props.label.toLowerCase()} found.</span>
              </div> );
          }
        }
        var postObjects = this.state.posts.map( (post, index) => {

        // Convert file name to title format and parse artist
        var parsed = post.title.split("]");
        var title = parsed[0];
        var artist = "";
        var score = post.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (this.props.label === "Other") {
          title = post.title;
        }
        else {
          if (parsed[1]) title = parsed[1].substring(1, parsed[1].length);
          if (title.includes("-")) {
            parsed = title.split("-");
            artist = parsed[0];
            title = parsed[1];
          }
        }
        // TODO: Add flame emoji for posts with 1,000+ upvotes
        // if (post.score > 1000) {
        //   score += &#128293;
        // }

        // Convert date to format
        var date = new Date(post.created_utc*1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        var dateString = dayNames[date.getDay()] + ", " + date.getDate() + " " + monthNames[date.getMonth()] + ", " +  date.getFullYear() +"  " + formattedTime;
        console.log(post.domain);
        return (
          <div className="post-container" key={index} data-index={index} onClick={this.handleClick}>
            <div className="post-image">
                <img src="vinyl.png" alt="album-art"></img>
                <div className="post-score">{score}</div>
            </div>
            <div className="post-info">
              <p className="post-title">{title}</p>
              <p className="post-artist">{artist}</p>
              <p> <span className={post.subreddit + "-badge badge"}>r/{post.subreddit}</span> <span className="post-date">• {dateString}</span></p>
              <p> <FontAwesomeIcon icon={faSpotify} /> <FontAwesomeIcon icon={faBandcamp} /> <FontAwesomeIcon icon={faApple} /> <FontAwesomeIcon icon={faSoundcloud} /> <FontAwesomeIcon icon={faYoutube} /></p>
            </div>
          </div>
        )
      });
    } else {
      return ( <ReactLoading className="loading-container" type={"bars"} color={"white"} height={"60%"} width={"60%"} /> );
    }

    return (
      <div className="tab-content-container">
          {
            postObjects
          }
      </div>
    )
  }

}

export default TabContent;
