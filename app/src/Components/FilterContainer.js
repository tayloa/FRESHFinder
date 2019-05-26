import React from 'react';
import Collapsible from 'react-collapsible';

class FilterContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dateRange: [0, 1],
      filters: []
    };
  }

  handleClick = (e) => {
      var text = e.currentTarget.textContent;
      var newFilters = this.state.filters;
      if (text[text.length - 1] === 'X') {
        text = text.slice( 0, text.length - 2);
        newFilters.splice( newFilters.indexOf(text), 1 );
        this.setState( {filters: newFilters} );
        e.currentTarget.textContent = text;
      } else {
        newFilters.push(e.currentTarget.textContent);
        this.setState( {filter: newFilters} );
        e.currentTarget.textContent = e.currentTarget.textContent + " X";
        e.currentTarget.className = "active-filter";
      }
      this.props.onSelectFilters(newFilters);
  }

  render() {
    return(
      <Collapsible trigger="Filter">
        <div id="filter-container">
          <div className="release-filter">
            <h1>Date</h1>
            <p>4/28/2019</p>
            <p>5/5/2019</p>
            <p>5/12/2019</p>
          </div>
          <div className="subreddit-filter">
            <h1>Subreddit</h1>
            <p onClick={this.handleClick}>r/HipHopHeads</p>
            <p onClick={this.handleClick}>r/indieheads</p>
            <p onClick={this.handleClick}>r/rnb</p>
            <p onClick={this.handleClick}>r/RnBHeads</p>
            <p onClick={this.handleClick}>r/popheads</p>
            <p onClick={this.handleClick}>r/mathrock</p>
          </div>
          <div className="sort-filter">
            <h1>Sort By</h1>
            <p onClick={this.handleClick}>Score</p>
            <p onClick={this.handleClick}>Post Date</p>
          </div>
          <div className="platform-filter">
            <h1>Platform</h1>
            <p onClick={this.handleClick}>SoundCloud</p>
            <p onClick={this.handleClick}>Spotify</p>
          </div>
        </div>
      </Collapsible>

    );
  }
}

export default FilterContainer;
