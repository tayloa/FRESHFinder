import React from 'react';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify, faSoundcloud, faYoutube, faApple, faBandcamp, faReddit } from "@fortawesome/free-brands-svg-icons";
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

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
      embedded: null,
      loading: true
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

  hideSpinner = () => {
    this.setState({ loading: false })
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
      return (<abbr title="Spotify" key={"spotify"}> <a href={url}>  <FontAwesomeIcon icon={faSpotify} /></a></abbr>);
    }
    if (url.includes("apple")) {
      return (<abbr title="Apple Music" key={"apple"}> <a href={url}>  <FontAwesomeIcon icon={faApple} /></a></abbr>);
    }
    if (url.includes("bandcamp")) {
      return (<abbr title="Bandcamp" key={"bandcamp"}> <a href={url}>  <FontAwesomeIcon icon={faBandcamp} /></a></abbr>);
    }
    if (url.includes("soundcloud")) {
      return (<abbr title="Soundcloud" key={"soundcloud"}> <a href={url}>  <FontAwesomeIcon icon={faSoundcloud} /></a></abbr>);
    }
    if (url.includes("youtube")) {
      return (<abbr title="YouTube" key={"youtube"}> <a href={url}>  <FontAwesomeIcon icon={faYoutube} /></a></abbr>);
    }
    return null;
  }


  closePost() {
    this.setState({ post: null, loading: true });
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
        platforms.push(<abbr title="Apple Music" key={"apple"}><a href={post.url}>  <FontAwesomeIcon icon={faApple} /></a></abbr>);
      }
      if (post.url.includes("bandcamp")) {
        platforms.push(<abbr title="Bandcamp" key={"bandcamp"}><a href={post.url}>  <FontAwesomeIcon icon={faBandcamp} /></a></abbr>);
      }
      if (post.url.includes("soundcloud")) {
        platforms.push(<abbr title="Soundcloud" key={"soundcloud"}><a href={post.url}>  <FontAwesomeIcon icon={faSoundcloud} /></a></abbr>);
      }
      if (post.url.includes("spotify")) {
        platforms.push(<abbr title="Spotify" key={"spotify"}><a href={post.url}>  <FontAwesomeIcon icon={faSpotify} /></a></abbr>);
      }
      if (post.url.includes("youtube")) {
        platforms.push(<abbr title="YouTube" key={"youtube"}><a href={post.url}>  <FontAwesomeIcon icon={faYoutube} /></a></abbr>);
      }
      platforms.push(<abbr title="Reddit" key={"reddit"}><a href={"https://www.reddit.com"+ this.state.post.permalink}><FontAwesomeIcon icon={faReddit} /></a></abbr>);

      return (
        <div>
          <span className="close-button" onClick={this.closePost}><FontAwesomeIcon icon={faWindowClose} /></span>
          <div id="info-container">
            <div className="content">
              {
                this.state.loading ?
                  <ReactLoading className="loading-container" type={"bars"} color={"white"} height={"25%"} width={"25%"} /> :
                      null
              }
              {
                this.state.embedded ?
                <iframe title="embedded" src={this.state.embedded} onLoad={this.hideSpinner} width="100%" height="auto" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe> :
                   <div className="center">Unable to generate preview</div>
              }

              <p className="post-platforms">
                {
                  platforms
                }
              </p>
            </div>
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
