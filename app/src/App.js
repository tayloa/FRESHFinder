import React from 'react';
import PostContainer from './Components/PostContainer';

function App() {
  return (
    <div id="page-frame">
      <div id="heading">
        <span className="logo">[FRESH]Finder</span>
        <br></br>
        <span>+ Music releases supplied by Reddit +</span>
      </div>
      <PostContainer />
    </div>
  );
}

export default App;
