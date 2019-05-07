import React from 'react';
import PostContainer from './postContainer';
import OptionsContainer from './optionsContainer';
import InfoContainer from './infoContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>[FRESH]Finder</h1>
      <div id="main-container">
        <PostContainer />
        <OptionsContainer />
      </div>
      <InfoContainer />
    </div>
  );
}

export default App;
