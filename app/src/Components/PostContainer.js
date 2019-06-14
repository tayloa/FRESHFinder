import React from 'react';
import TabContent from './TabContent';
import Tabs from './Tabs';
import axios from 'axios';
import InfoContainer from './InfoContainer';
import FilterContainer from './FilterContainer';
import ReactLoading from 'react-loading';

class PostContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      key: 'albums',
      filters: null,
      selected: null,
      posts: null
    };
    this.serverRequest = this.serverRequest.bind(this);
  }

  serverRequest = () => {
    axios.get(`http://localhost:8080/api/search/${this.state.filters ? this.state.filters.time : ""}`)
      .then(res => {
            var posts = res.data;
            this.setState({ posts });
            this.setState({ loading: false });
      });
  }

  componentDidMount() {
    this.serverRequest();
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  handleSelectedPost = (post) => {
    this.setState({selected: post});
  }

  handleSelectedFilters = (newFilters) => {
    this.setState({ loading: true });
    this.setState({ filters: newFilters }, () => {
      this.serverRequest();
    });
  }

  handleClosePost = () => {
    this.setState({ selected: null });
  }
  render() {
    return (
      <div id="main-container">
        <div id="posts-container">
          <InfoContainer closePost={this.handleClosePost} post={this.state.selected}/>
          <FilterContainer onSelectFilters={this.handleSelectedFilters}/>
          <Tabs>
            <div label="Albums">
               { this.state.loading ?
                 <ReactLoading className="loading-container" type={"bars"} color={"white"} height={"25%"} width={"25%"} /> :
                 <TabContent label="Albums" posts={this.state.posts.albums} onSelectPost={this.handleSelectedPost} filters={this.state.filters}/>
                }
            </div>
            <div label="Singles">
              { this.state.loading ?
                <ReactLoading className="loading-container" type={"bars"} color={"white"} height={"25%"} width={"25%"} /> :
                <TabContent label="Singles" posts={this.state.posts.singles} onSelectPost={this.handleSelectedPost} filters={this.state.filters}/>
              }
            </div>
            <div label="EPs">
              { this.state.loading ?
                <ReactLoading className="loading-container" type={"bars"} color={"white"} height={"25%"} width={"25%"} /> :
                <TabContent label="EPs" posts={this.state.posts.eps} onSelectPost={this.handleSelectedPost} filters={this.state.filters}/>
              }
            </div>
            <div label="Mixtapes">
              { this.state.loading ?
                <ReactLoading className="loading-container" type={"bars"} color={"white"} height={"25%"} width={"25%"} /> :
                <TabContent label="Mixtapes" posts={this.state.posts.mixtapes} onSelectPost={this.handleSelectedPost} filters={this.state.filters}/>
              }
            </div>
            <div label="Other">
              { this.state.loading ?
                <ReactLoading className="loading-container" type={"bars"} color={"white"} height={"25%"} width={"25%"} /> :
                <TabContent label="Other" posts={this.state.posts.other} onSelectPost={this.handleSelectedPost} filters={this.state.filters}/>
              }
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default PostContainer;
