import React from 'react';

class InfoContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      post: this.props.post
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.post !== prevProps.post) {
      this.setState({ post: this.props.post });
    }
  }

  render() {
    if (!this.state.post) {
      return (null);
    } else {
      var post = this.state.post;

      // Convert article file name to title format
      var parsed = post.title.split("]");
      var title = parsed[0];
      if (parsed[1]) title = parsed[1].substring(1, parsed[1].length);
      return (
        <div id="info-container">
          <img src="default-album.png" alt="album-art"/>
          <p className="info-text">{title}</p>
          <p className="info-text">{post.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          <p className="info-text">{post.subreddit}</p>
          <p className="info-text">{post.link}</p>
          <a href={post.domain} className="info-text">{post.domain}</a>
          <a href={"https://www.reddit.com"+post.permalink}><p>{post.title}</p></a>
        </div>
      )

    }
  }

}

export default InfoContainer;
