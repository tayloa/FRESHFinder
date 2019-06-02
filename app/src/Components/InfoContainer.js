import React from 'react';
import axios from 'axios';

class InfoContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      post: this.props.post,
      embeded: null
    }
  }

  // componentDidMount() {
  //   if (this.state.post) {
  //     console.log(this.post);
  //     this.serverRequest = axios.get(this.state.post.url)
  //       .then(res => {
  //             var embeded = res.data;
  //             console.log(res.data);
  //             this.setState({ embeded });
  //       })
  //   }
  // }

  componentDidUpdate(prevProps) {
    if (this.props.post !== prevProps.post) {
      this.setState({ post: this.props.post });
      if (this.props.post) {
        console.log(this.post);
        this.serverRequest = axios.get(this.props.post.url,
          {
            headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }})
          .then(res => {
                var embeded = res.data;
                console.log(res.data);
                this.setState({ embeded });
          })
      }
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
          <p className="info-text">{title}</p>
          <p className="info-text">{post.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          <p className="info-text">{post.subreddit}</p>
          <p className="info-text">{post.link}</p>
          <a href={post.domain} className="info-text">{post.domain}</a>
          <a href={"https://www.reddit.com"+post.permalink}><p>{post.title}</p></a>
          <div>{this.state.embeded}</div>
        </div>
      )

    }
  }

}

export default InfoContainer;
