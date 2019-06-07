import React from 'react';
import Collapsible from './Collapsible';

class FilterContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      releaseRange: [],
      subs: [],
      score: false,
      date: false,
      platforms: []
    };
  }

  handleDateClick = (e) => {
      var text = e.currentTarget.textContent;
      if (!this.state.date) {
        this.setState( {date: true}, () => {
          this.props.onSelectFilters(this.state);
        });
        e.currentTarget.textContent = e.currentTarget.textContent + " X";
        e.currentTarget.className = "active-filter";
      } else {
        text = text.slice( 0, text.length - 2);
        this.setState( {date: false}, () => {
          this.props.onSelectFilters(this.state);
        });
        e.currentTarget.textContent = text;
        e.currentTarget.className = "";
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
            <div className="release-filter">
              <h1>DATE RANGE</h1>
              <p>Last Hour</p>
              <p>Today</p>
              <p>This week</p>
              <p>This month</p>
              <p>This year</p>
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
              <p onClick={this.handlePlatformClick}>Apple Music</p>
              <p onClick={this.handlePlatformClick}>Bandcamp</p>
              <p onClick={this.handlePlatformClick}>SoundCloud</p>
              <p onClick={this.handlePlatformClick}>Spotify</p>
              <p onClick={this.handlePlatformClick}>YouTube</p>
            </div>
          </div>
        </Collapsible>
    );
  }
}

export default FilterContainer;
