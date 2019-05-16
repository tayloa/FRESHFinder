import React from 'react';
import TabContent from './TabContent';
import axios from 'axios';
import { Nav, Tab } from 'react-bootstrap';
import { CircleSpinner } from "react-spinners-kit";


class PostContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      key: 'albums',
      filter: this.props.filter,
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
                <TabContent posts={this.state.posts.albums} filter=""/>
              </Tab.Pane>
              <Tab.Pane eventKey="singles">
                <TabContent posts={this.state.posts.singles} filter=""/>
              </Tab.Pane>
              <Tab.Pane eventKey="eps">
                <TabContent posts={this.state.posts.eps} filter=""/>
              </Tab.Pane>
              <Tab.Pane eventKey="mixtapes">
                <TabContent posts={this.state.posts.mixtapes} filter=""/>
              </Tab.Pane>
              <Tab.Pane eventKey="other">
                <TabContent posts={this.state.posts.other} filter=""/>
              </Tab.Pane>
            </Tab.Content> : <CircleSpinner size={200}/>
          }

          </Tab.Container>
        </div>
      </div>
    );
  }
}

export default PostContainer;
