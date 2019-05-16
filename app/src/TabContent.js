import React from 'react';

class TabContent extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      posts: this.props.posts,
      filter: this.props.filter
    }
  }

  render() {
    return (
      <div className="tab-content-container">
          {
           this.state.posts.map( (post) => {

             // Convert article file name to title format
             var parsed = post.data.title.split("]");
             var title = parsed[0];
             if (parsed[1]) title = parsed[1].substring(1, parsed[1].length);
             return (
                <a className="post-link" key={post.data.permalink} href={"https://www.reddit.com"+post.data.permalink}><h4 >{title}</h4></a>
             )
           })
          }

      </div>
    )
  }

}

export default TabContent;
