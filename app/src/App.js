import React from 'react';
import PostContainer from './Components/PostContainer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

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
