import React from 'react';
import PostContainer from './PostContainer';
import InfoContainer from './InfoContainer';

function App() {
  return (
    <div id="page-frame">
      <h1>[FRESH]Finder</h1>
      <PostContainer />
      <div id="options-container">
        <div>FILTER</div>
          <select name="list" id="personlist">
            <option value="4/28/2019">4/28/2019</option>
            <option value="5/5/2019">5/5/2019</option>
            <option value="5/12/2019">5/12/2019</option>
         </select>
        <button>r/HipHopHeads</button>
        <button>r/IndieHeads</button>
        <button>r/RnB</button>
        <button>r/RnBHeads</button>
        <button>r/PopHeads</button>
        <button>r/MathRock</button>
      </div>
      <InfoContainer />
    </div>
  );
}

export default App;
