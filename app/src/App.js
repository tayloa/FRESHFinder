import React from 'react';
import PostContainer from './Components/PostContainer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

library.add(faStroopwafel);

function App() {
  return (
    <div id="page-frame">
      <div id="header"><h1>[FRESH]Finder</h1></div>
      <PostContainer />
    </div>
  );
}

export default App;
