import React from 'react';
import { CircleSpinner } from "react-spinners-kit";

class TabContent extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state =  {
      posts: this.props.posts,
      filter: this.props.filter
    }
  }

  handleClick(e) {
      var index = e.currentTarget.dataset.index;
      this.props.onSelectPost(this.state.posts[Number(index)].data);
  }

  render() {

    if (this.state.posts) {
      var postObjects = this.state.posts.map( (post, index) => {

        // Convert article file name to title format
        var parsed = post.data.title.split("]");
        var title = parsed[0];
        var artist = "";
        if (parsed[1]) title = parsed[1].substring(1, parsed[1].length);
        if (title.includes("-")) {
          parsed = title.split("-");
          artist = parsed[0];
          title = parsed[1];
        }

        return (
          <div className="post-container" key={index} data-index={index} onClick={this.handleClick}>
            <div className="post-image">
                <img src="default-album.png" alt="album-art"></img>
            </div>
            <div className="post-info">
              <p>{title}</p>
              <p>{artist}</p>
              <p>r/{post.data.subreddit}</p>
            </div>
            <div className="post-score">{post.data.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
          </div>
        )
      });
    } else {
      return ( <CircleSpinner size={200}/> );
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
