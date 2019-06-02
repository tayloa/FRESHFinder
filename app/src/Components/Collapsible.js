import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';


class Collapsible extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       open: false
     }
     this.togglePanel = this.togglePanel.bind(this);
   }

   togglePanel(e) {
     this.setState({open: !this.state.open});
   }

   render() {
     return (<div id={this.props.id}>
       <div onClick={(e)=>this.togglePanel(e)} className="collapsible-header">
       <p><FontAwesomeIcon icon={faSlidersH} /> {this.props.title}</p>
     </div>
       {this.state.open ? (<div className="collapsible-content">{this.props.children}</div>) : <div className="collapsible-content hide">{this.props.children}</div>}
     </div>);
   }
}

export default Collapsible;
