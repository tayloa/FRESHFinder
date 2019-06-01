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

  handleSelectedFilters = (newFilters) => {
    this.setState({ loading: true});
    this.setState({ filters: newFilters }, () => {
      this.setState({ loading: false });
    });
  }

  // <InfoContainer post={this.state.selected}/>

  render() {
    // if (this.state.filters) {
    //   var filters = this.state.filters.subs.map( (sub, index) => {
    //     sub = sub.slice(2);
    //     return ( <span className={sub + "-badge badge"} key={index}>r/{sub}</span> );
    //   });
    // }
    return (
      <div id="main-container">
        <div id="posts-container">
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
