import React from 'react';

class PostContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div id="posts-container">
        <h1>Posts</h1>
        <p>Post 1</p>
        <p>Post 2</p>
        <p>Post 3</p>
        <p>Post 4</p>
        <p>Post 5</p>
        <p>Post 6</p>
      </div>
    );
  }
}

export default PostContainer;
