import React from 'react';
import Collapsible from 'react-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      <Collapsible trigger="FILTER">
        <div id="filter-container">
          <div className="release-filter">
            <h1>Date</h1>
          </div>
          <div className="subreddit-filter">
            <h1>Subreddit</h1>
            <p onClick={this.handleSubClick}>r/hiphopheads</p>
            <p onClick={this.handleSubClick}>r/indieheads</p>
            <p onClick={this.handleSubClick}>r/rnb</p>
            <p onClick={this.handleSubClick}>r/RnBHeads</p>
            <p onClick={this.handleSubClick}>r/popheads</p>
            <p onClick={this.handleSubClick}>r/mathrock</p>
          </div>
          <div className="sort-filter">
            <h1>Sort By</h1>
            <p onClick={this.handleScoreClick}>Score (Descending)</p>
            <p onClick={this.handleDateClick}>Post Date</p>
          </div>
          <div className="platform-filter">
            <h1>Platform</h1>
            <p onClick={this.handlePlatformClick}>SoundCloud</p>
            <p onClick={this.handlePlatformClick}>Spotify</p>
          </div>
        </div>
      </Collapsible>

    );
  }
}

export default FilterContainer;
