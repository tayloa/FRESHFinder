import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify, faSoundcloud, faYoutube, faApple, faBandcamp } from "@fortawesome/free-brands-svg-icons";
import { faTimesCircle, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

class InfoContainer extends React.Component {

  constructor(props) {
    super(props);
    this.closePost = this.closePost.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.getEmbeddedLink = this.getEmbeddedLink.bind(this);
    this.generateIcon = this.generateIcon.bind(this);
    this.state =  {
      post: this.props.post,
      links: [],
      embedded: null
    }
  }

  getLinks(text) {
    var links = text.match(/href="[^"]*"/g);
    var res = links.map(function(link) {
      var parsed = link.match(/"(.*?)"/g);
      return parsed[0];
    });
    return res;
  }

  getEmbeddedLink(url) {
    var embedded = null;
    var index = -1;
    var parse = "";

    if (url) {
      url = url.replace(/"/g,'');

      if (url.includes("spotify")) {
        index = url.lastIndexOf("/");
        parse = url.slice(index+1, url.length);
        if (url.includes("album"))
          embedded = "https://open.spotify.com/embed/album/"+parse;
        if (url.includes("track"))
          embedded = "https://open.spotify.com/embed/track/"+parse;
      }
      if (url.includes("apple") && url.includes("album")) {
        // src="https://embed.music.apple.com/us/album/she-is-coming/1465295635?app=music">
        // "https://embed.music.apple.com/us/album/mothers-daughter/1465295635?i=1465296236&app=music"></iframe>
        index = url.indexOf("album/");
        parse = url.slice(index,  url.length);
        embedded = "https://embed.music.apple.com/us/"+parse+"?app=music";
      }
      if (url.includes("youtube")) {
        index = url.indexOf("v=");
        parse = url.slice(index+2, url.length);
        embedded = "https://www.youtube.com/embed/"+parse;
      }
      if (url.includes("youtu.be")) {
        // https://youtu.be/c4Ad19dXIGM
        index = url.lastIndexOf("/");
        parse = url.slice(index+1, url.length);
        embedded = "https://www.youtube.com/embed/"+parse;
      }
    }
    return embedded;
  }

  generateIcon(url) {
    if (url.includes("spotify")) {
      return (<a href={url} key={"spotify"}>  <FontAwesomeIcon icon={faSpotify} /></a>);
    }
    if (url.includes("apple")) {
      return (<a href={url} key={"apple"}>  <FontAwesomeIcon icon={faApple} /></a>);
    }
    if (url.includes("bandcamp")) {
      return (<a href={url} key={"bandcamp"}>  <FontAwesomeIcon icon={faBandcamp} /></a>);
    }
    if (url.includes("soundcloud")) {
      return (<a href={url} key={"soundcloud"}>  <FontAwesomeIcon icon={faSoundcloud} /></a>);
    }
    if (url.includes("youtube")) {
      return (<a href={url} key={"youtube"}>  <FontAwesomeIcon icon={faYoutube} /></a>);
    }
    return null;
  }


  closePost() {
    this.setState({ post: null });
    this.props.closePost();
  }

  componentDidUpdate(prevProps) {
    if (this.props.post !== prevProps.post) {
      this.setState({
        post: this.props.post,
        links: [],
        embedded: null
       });
      if (this.props.post) {
        var post = this.props.post;
        var embedded = this.getEmbeddedLink(post.url);

        // Find a working stream link
        if (post.selftext_html) {
          var links = this.getLinks(post.selftext_html);
          this.setState({ links });
          if (!embedded) {
            links = links.map( this.getEmbeddedLink );
            embedded = links.find(l => l);
          }
        }
        this.setState({ embedded });
      }
    }
  }

  render() {
    if (!this.state.post) {
      return (null);
    } else {
      var post = this.state.post;
      var platforms  = this.state.links.map( this.generateIcon );
      if (post.url.includes("apple")) {
        platforms.push(<a href={post.url} key={"apple"}>  <FontAwesomeIcon icon={faApple} /></a>);
      }
      if (post.url.includes("bandcamp")) {
        platforms.push(<a href={post.url} key={"bandcamp"}>  <FontAwesomeIcon icon={faBandcamp} /></a>);
      }
      if (post.url.includes("soundcloud")) {
        platforms.push(<a href={post.url} key={"soundcloud"}>  <FontAwesomeIcon icon={faSoundcloud} /></a>);
      }
      if (post.url.includes("spotify")) {
        platforms.push(<a href={post.url} key={"spotify"}>  <FontAwesomeIcon icon={faSpotify} /></a>);
      }
      if (post.url.includes("youtube")) {
        platforms.push(<a href={post.url} key={"youtube"}>  <FontAwesomeIcon icon={faYoutube} /></a>);
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
            <p className="post-platforms">
              {
                platforms
              }
              <a href={"https://www.reddit.com"+ this.state.post.permalink}> <FontAwesomeIcon icon={faExternalLinkAlt} /></a>
            </p>
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
