import React from 'react';
import TabContent from './TabContent';
import axios from 'axios';
import { Nav, Tab } from 'react-bootstrap';
import InfoContainer from './InfoContainer';
import { CircleSpinner } from "react-spinners-kit";


class PostContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      key: 'albums',
      filter: this.props.filter,
      selected: null,
      posts: null
    };
  }

  componentDidMount() {
    this.serverRequest = axios.get('http://localhost:8080/api/search')
      .then(res => {
            var posts = res.data;
            this.setState({ posts });
            this.setState({ loading: false });
      })
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  handleSelected = (post) => {
    this.setState({selected: post});
  }

  render() {
    return (
      <div id="main-container">
        <div id="posts-container">
          <Tab.Container defaultActiveKey="albums">

            <Nav fill variant="tabs">
              <Nav.Item bsPrefix="albums-nav-link">
                <Nav.Link className="albums-tab" eventKey="albums">Albums</Nav.Link>
              </Nav.Item>
              <Nav.Item bsPrefix="singles-nav-link">
                <Nav.Link className="singles-tab" eventKey="singles">Singles</Nav.Link>
              </Nav.Item>
              <Nav.Item bsPrefix="eps-nav-link">
                <Nav.Link className="eps-tab" eventKey="eps">EPs</Nav.Link>
              </Nav.Item>
              <Nav.Item bsPrefix="mixtapes-nav-link">
                <Nav.Link className="mixtapes-tab" eventKey="mixtapes">MIxtapes</Nav.Link>
              </Nav.Item>
              <Nav.Item bsPrefix="others-nav-link">
                <Nav.Link className="others-tab" eventKey="other">Other</Nav.Link>
              </Nav.Item>
            </Nav>

            {this.state.posts ? <Tab.Content>
              <Tab.Pane eventKey="albums">
                <TabContent posts={this.state.posts.albums} onSelectPost={this.handleSelected} filter=""/>
              </Tab.Pane>
              <Tab.Pane eventKey="singles">
                <TabContent posts={this.state.posts.singles} onSelectPost={this.handleSelected} filter=""/>
              </Tab.Pane>
              <Tab.Pane eventKey="eps">
                <TabContent posts={this.state.posts.eps} onSelectPost={this.handleSelected} filter=""/>
              </Tab.Pane>
              <Tab.Pane eventKey="mixtapes">
                <TabContent posts={this.state.posts.mixtapes} onSelectPost={this.handleSelected} filter=""/>
              </Tab.Pane>
              <Tab.Pane eventKey="other">
                <TabContent posts={this.state.posts.other} onSelectPost={this.handleSelected} filter=""/>
              </Tab.Pane>
            </Tab.Content> : <CircleSpinner size={200}/>
          }

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
          </Tab.Container>
        </div>

        <InfoContainer post={this.state.selected}/>
      </div>
    );
  }
}

export default PostContainer;
