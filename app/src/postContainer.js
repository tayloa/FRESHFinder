import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

class PostContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'albums',
      posts: [
        "",
        "",
        "",
        "",
        ""
      ]
    };
  }

  
  render() {
    return (
      <div id="main-container">
        <div id="posts-container">
          <Tabs
            activeKey={this.state.key}
            onSelect={key => this.setState({ key })}
          >
            <Tab eventKey="albums" title="Albums">
              <span class="post-link">[FRESH] Kevin Abstract - ARIZONA Baby</span>
            </Tab>
            <Tab eventKey="singles" title="Singles">
              <span class="post-link">[FRESH] Kevin Abstract - Peach</span>
            </Tab>
            <Tab eventKey="mixtapes" title="Mixtapes">

            </Tab>
            <Tab eventKey="eps" title="EPs">

            </Tab>
            <Tab eventKey="other" title="Other">

            </Tab>
            <Tab eventKey="all" title="All">

            </Tab>
          </Tabs>
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
        </div>
      </div>
    );
  }
}

// <h4 className="post-link">Albums</h4>
// <h4 className="post-link">Mixtapes</h4>
// <h4 className="post-link">EPs</h4>
// <h4 className="post-link">Singles</h4>
// <h4 className="post-link">Other</h4>
// <h4 className="post-link">All</h4>
export default PostContainer;
