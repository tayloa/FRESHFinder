import React from 'react';

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
      var index = e.target.dataset.index;
      console.log(index);
      // this.props.onSelectPost(this.state.posts[Number(index)].data);
  }

  render() {
    return (
      <div className="tab-content-container">
          {
           this.state.posts.map( (post, index) => {

             // Convert article file name to title format
             var parsed = post.data.title.split("]");
             var title = parsed[0];
             var artist = null;
             if (parsed[1]) title = parsed[1].substring(1, parsed[1].length);
             if (title.includes("-")) {
               parsed = title.split("-");
               artist = parsed[0];
               title = parsed[1];
             } else if (title.includes("–")) {
               parsed = title.split("–");
               artist = parsed[0];
               title = parsed[1];
             }
             return (
               <div className="post-container" key={index} data-index={index} onClick={this.handleClick}>
                 <p>{title}</p>
                 <p>{artist}</p>
               </div>
             )
           })
          }

      </div>
    )
  }

}

export default TabContent;
