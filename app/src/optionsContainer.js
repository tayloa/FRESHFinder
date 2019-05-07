import React from 'react';

class OptionsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {

    }
  }

  render() {
    return (
      <div id="options-container">
        <h1>Select a Type</h1>
        <p>Albums</p>
        <p>Mixtapes</p>
        <p>EPs</p>
        <p>Singles</p>
        <p>Other</p>
        <p>All</p>
      </div>
    );
  }

}

export default OptionsContainer;
