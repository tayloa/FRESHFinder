import React from 'react';
import TabContent from './TabContent';
import Tabs from './Tabs';
import axios from 'axios';
import InfoContainer from './InfoContainer';
import FilterContainer from './FilterContainer';
import { CircleSpinner } from "react-spinners-kit";



class PostContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      key: 'albums',
      filters: [],
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

  handleSelectedPost = (post) => {
    this.setState({selected: post});
  }

  handleSelectedFilters = (filters) => {
    this.setState({ filters });
  }

  render() {
    return (
      <div id="main-container">
        <div id="posts-container">
          <div>
            <FilterContainer onSelectFilters={this.handleSelectedFilters}/>
            {this.state.posts ?
              <Tabs>
                <div label="Albums">
                  <TabContent posts={this.state.posts.albums} onSelectPost={this.handleSelectedPost} filters=""/>
                </div>
                <div label="Singles">
                  <TabContent posts={this.state.posts.singles} onSelectPost={this.handleSelectedPost} filters=""/>
                </div>
                <div label="EPs">
                  <TabContent posts={this.state.posts.eps} onSelectPost={this.handleSelectedPost} filters=""/>
                </div>
                <div label="Mixtapes">
                  <TabContent posts={this.state.posts.mixtapes} onSelectPost={this.handleSelectedPost} filters=""/>
                </div>
                <div label="Other">
                  <TabContent posts={this.state.posts.other} onSelectPost={this.handleSelectedPost} filters=""/>
                </div>

              </Tabs> :
              <CircleSpinner size={200}/>
            }
          </div>
          {
            this.state.filters
          }
        </div>

        <InfoContainer post={this.state.selected}/>
      </div>
    );
  }
}

export default PostContainer;
