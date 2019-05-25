import React from 'react';
import TabContent from './TabContent';
import Tabs from './Tabs';
import axios from 'axios';
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
          <div>
            {this.state.posts ?
              <Tabs>
                <div label="Albums">
                  <TabContent posts={this.state.posts.albums} onSelectPost={this.handleSelected} filter=""/>
                </div>
                <div label="Singles">
                  <TabContent posts={this.state.posts.singles} onSelectPost={this.handleSelected} filter=""/>
                </div>
                <div label="EPs">
                  <TabContent posts={this.state.posts.eps} onSelectPost={this.handleSelected} filter=""/>
                </div>
                <div label="Mixtapes">
                  <TabContent posts={this.state.posts.mixtapes} onSelectPost={this.handleSelected} filter=""/>
                </div>
                <div label="Other">
                  <TabContent posts={this.state.posts.other} onSelectPost={this.handleSelected} filter=""/>
                </div>
              </Tabs> :
              <CircleSpinner size={200}/>
            }
          </div>

          <div id="options-container">
            <div>FILTER</div>
              <select name="list" id="personlist">
                <option value="4/28/2019">4/28/2019</option>
                <option value="5/5/2019">5/5/2019</option>
                <option value="5/12/2019">5/12/2019</option>
              </select>
              <span>r/HipHopHeads</span>
              <span>r/IndieHeads</span>
              <span>r/RnB</span>
              <span>r/RnBHeads</span>
              <span>r/PopHeads</span>
              <span>r/MathRock</span>
          </div>
        </div>

        <InfoContainer post={this.state.selected}/>
      </div>
    );
  }
}

export default PostContainer;
