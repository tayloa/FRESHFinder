import React from 'react';

class TabContent extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      posts: this.props.posts,
      filter: this.props.filter
    }
  }

  componentDidMount() {
    console.log(this.state.posts);
  }

  render() {
    return (
      <div className="tab-content-container">
          {
           this.state.posts.map( (post) => {

             // Convert article file name to title format
             console.log(post.title);
             var parsed = post.title.split("]");
             var title = parsed[0];
             if (parsed[1]) title = parsed[1].substring(1, parsed[1].length);
             return (
                <h4 className="post-link" key={post.link}>{title}</h4>
             )
           })
          }

      </div>
    )
  }

}

export default TabContent;
