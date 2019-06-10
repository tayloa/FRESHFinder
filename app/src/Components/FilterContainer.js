import React from 'react';
import Collapsible from './Collapsible';

class FilterContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      releaseRange: [],
      subs: [],
      score: false,
      time: "week",
      platforms: []
    };
    this.handleTimeClick = this.handleTimeClick.bind(this);
    this.handleSubClick = this.handleSubClick.bind(this);
    this.handleScoreClick = this.handleScoreClick.bind(this);
    this.handlePlatformClick = this.handlePlatformClick.bind(this);

  }

  handleTimeClick = (e) => {
    var oldTime = this.state.time;
    var newTime = e.target.dataset.time;
    if (e.target.textContent !== "TIME") {
      if (newTime !== oldTime) {
        var objs = Array.prototype.slice.call( e.currentTarget.children );
        var oldIndex = objs.findIndex( function(item, i) {
          return item.dataset.time === oldTime;
        });
        var newIndex = objs.findIndex( function(item, i) {
          return item.dataset.time === newTime;
        });
        var oldText = e.currentTarget.children[oldIndex].textContent;
        var newText = e.currentTarget.children[newIndex].textContent;
        e.currentTarget.children[oldIndex].textContent = oldText.slice( 0, oldText.length - 2);
        e.currentTarget.children[oldIndex].className = "";
        e.currentTarget.children[newIndex].textContent = newText + " X";
        e.currentTarget.children[newIndex].className = "active-filter";
        this.setState({ time: newTime }, () => {
          this.props.onSelectFilters(this.state);
        });
      }
    }
  }

  handleSubClick = (e) => {
      var text = e.currentTarget.textContent;
      var newFilters = this.state.subs;
      if (text[text.length - 1] === 'X') {
        text = text.slice( 0, text.length - 2);
        newFilters.splice( newFilters.indexOf(text), 1 );
        this.setState( {subs: newFilters}, () => {
          this.props.onSelectFilters(this.state);
        });
        e.currentTarget.textContent = text;
        e.currentTarget.className = "";
      } else {
        newFilters.push(e.currentTarget.textContent);
        this.setState( {subs: newFilters}, () => {
          this.props.onSelectFilters(this.state);
        });
        e.currentTarget.textContent = e.currentTarget.textContent + " X";
        e.currentTarget.className = "active-filter";
      }
  }

  handleScoreClick = (e) => {
    var text = e.currentTarget.textContent;
    if (!this.state.score) {
      this.setState( {score: true}, () => {
        this.props.onSelectFilters(this.state);
      });
      e.currentTarget.textContent = e.currentTarget.textContent + " X";
      e.currentTarget.className = "active-filter";
    } else {
      text = text.slice( 0, text.length - 2);
      this.setState( {score: false}, () => {
        this.props.onSelectFilters(this.state);
      });
      e.currentTarget.textContent = text;
      e.currentTarget.className = "";
    }
  }

  handlePlatformClick = (e) => {
      var text = e.currentTarget.textContent;
      var newPlatforms = this.state.platforms;
      if (text[text.length - 1] === 'X') {
        text = text.slice( 0, text.length - 2);
        newPlatforms.splice( newPlatforms.indexOf(text), 1 );
        this.setState( {platforms: newPlatforms}, () => {
          this.props.onSelectFilters(this.state);
        });
        e.currentTarget.textContent = text;
        e.currentTarget.className = "";
      } else {
        newPlatforms.push(e.currentTarget.textContent);
        this.setState({platforms: newPlatforms}, () => {
          this.props.onSelectFilters(this.state);
        });
        e.currentTarget.textContent = e.currentTarget.textContent + " X";
        e.currentTarget.className = "active-filter";
      }
  }

  render() {
    return(
        <Collapsible id="filter-collapsible-container" title="FILTER" icon="sliders">
          <div id="filter-container">
            <div className="release-filter" onClick={this.handleTimeClick}>
              <h1>TIME</h1>
              <p data-time="hour" data-selected={false}>Last Hour</p>
              <p data-time="day" data-selected={false}>Today</p>
              <p className="active-filter" data-time="week" data-selected={true}>This week X</p>
              <p data-time="month" data-selected={false}>This month</p>
              <p data-time="year" data-selected={false}>This year</p>
              <p data-time="all" data-selected={false}>All Time</p>
            </div>
            <div className="subreddit-filter">
              <h1>SUBREDDIT</h1>
              <p onClick={this.handleSubClick}>r/hiphopheads</p>
              <p onClick={this.handleSubClick}>r/indieheads</p>
              <p onClick={this.handleSubClick}>r/rnb</p>
              <p onClick={this.handleSubClick}>r/RnBHeads</p>
              <p onClick={this.handleSubClick}>r/popheads</p>
              <p onClick={this.handleSubClick}>r/mathrock</p>
            </div>
            <div className="sort-filter">
              <h1>SORT BY</h1>
              <p onClick={this.handleScoreClick}>Score (Descending)</p>
              <p onClick={this.handleDateClick}>Post Date (Most Recent)</p>
            </div>
            <div className="platform-filter">
              <h1>PLATFORM</h1>
              <p data-platform="apple" onClick={this.handlePlatformClick}>Apple Music</p>
              <p data-platform="bandcamp" onClick={this.handlePlatformClick}>Bandcamp</p>
              <p data-platform="soundcloud" onClick={this.handlePlatformClick}>SoundCloud</p>
              <p data-platform="spotify" onClick={this.handlePlatformClick}>Spotify</p>
              <p data-platform="youtube" onClick={this.handlePlatformClick}>YouTube</p>
            </div>
          </div>
        </Collapsible>
    );
  }
}

export default FilterContainer;
