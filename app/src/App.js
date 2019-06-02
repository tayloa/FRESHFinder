import React from 'react';
import PostContainer from './Components/PostContainer';

function App() {
  return (
    <div id="page-frame">
      <div id="heading">
        <h1>[FRESH]Finder</h1>
        <span>+ Music releases supplied by Reddit +</span>
      </div>
      <PostContainer />
    </div>
  );
}

export default App;
