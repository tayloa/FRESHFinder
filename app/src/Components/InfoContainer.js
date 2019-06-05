import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify, faSoundcloud, faYoutube, faApple, faBandcamp } from "@fortawesome/free-brands-svg-icons";
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class InfoContainer extends React.Component {

  constructor(props) {
    super(props);
    this.closePost = this.closePost.bind(this);
    this.state =  {
      post: this.props.post,
      embedded: null
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.post !== prevProps.post) {
      this.setState({ post: this.props.post });
      if (this.props.post) {
        var embedded = null;
        var url = this.props.post.url;
        var index = 0;
        var parse = "";

        if (this.props.post.url.includes("spotify")) {
          index = url.lastIndexOf("/");
          parse = url.slice(index+1, url.length);
          if (this.props.post.url.includes("album"))
            embedded = "https://open.spotify.com/embed/album/"+parse;
          if (this.props.post.url.includes("track"))
            embedded = "https://open.spotify.com/embed/track/"+parse;
        }
        if (this.props.post.url.includes("apple") && this.props.post.url.includes("album")) {
          // src="https://embed.music.apple.com/us/album/she-is-coming/1465295635?app=music">
          // "https://embed.music.apple.com/us/album/mothers-daughter/1465295635?i=1465296236&app=music"></iframe>
          index = url.indexOf("album/");
          parse = url.slice(index,  url.length);
          embedded = "https://embed.music.apple.com/us/"+parse+"?app=music";
        }
        if (this.props.post.url.includes("youtube") || this.props.post.url.includes("youtu.be")) {
          index = url.indexOf("v=");
          parse = url.slice(index+2, url.length);
          embedded = "https://www.youtube.com/embed/"+parse;
        }
        this.setState({ embedded });
      }
    }
  }

  closePost() {
    this.setState({ post: null });
    this.props.closePost();
  }

  render() {
    if (!this.state.post) {
      return (null);
    } else {
      var post = this.state.post;
      // Convert article file name to title format
      // var parsed = post.title.split("]");
      // var title = parsed[0];
      // if (parsed[1]) title = parsed[1].substring(1, parsed[1].length);

      var platforms = [];
      var text = post.selftext.toLowerCase();

      // <a href={post.url} key={"a"}> <FontAwesomeIcon icon={faSpotify} /></a>
      if (post.domain.includes("spotify") || text.includes("spotify")) {
        platforms.push(<span key={"spotify"}>  <FontAwesomeIcon icon={faSpotify} /></span>);
      }
      if (post.domain.includes("apple") || text.includes("apple music")) {
        platforms.push(<span key={"apple"}>  <FontAwesomeIcon icon={faApple} /></span>);
      }
      if (post.domain.includes("bandcamp") || text.includes("bandcamp")) {
        platforms.push(<span key={"bandcamp"}>  <FontAwesomeIcon icon={faBandcamp} /></span>);
      }
      if (post.domain.includes("soundcloud") || text.includes("soundcloud")) {
        platforms.push(<span key={"soundcloud"}>  <FontAwesomeIcon icon={faSoundcloud} /></span>);
      }
      if (post.domain.includes("youtube") || post.domain.includes("youtu.be") || text.includes("youtube")) {
        platforms.push(<span key={"youtube"}>  <FontAwesomeIcon icon={faYoutube} /></span>);
      }

      return (
        <div id="info-container">
          <span onClick={this.closePost}><FontAwesomeIcon icon={faTimesCircle} /></span>
          <div className="content">
            {
              this.state.embedded ?
                <iframe title="embedded" src={this.state.embedded} width="100%" height="auto" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe> :
                <div>Unable to generate preview</div>
            }
          </div>
        </div>
      )

    }
    // <p className="info-text">{title}</p>
    // <p className="info-text">{post.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
    // <p className="info-text">{post.subreddit}</p>
    // <p className="info-text">{post.link}</p>
    // <a href={post.domain} className="info-text">{post.domain}</a>
    // <a href={"https://www.reddit.com"+post.permalink}><p>{post.title}</p></a>
    // <span>Release History (Graph Data)</span>
    // {
    //   platforms
    // }
  }

}

export default InfoContainer;
