import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
       <div onClick={(e)=>this.togglePanel(e)} className="collapsible-header"><FontAwesomeIcon icon={this.props.icon}/> {this.props.title}</div>
       {this.state.open ? (<div className="collapsible-content">{this.props.children}</div>) : <div className="collapsible-content hide">{this.props.children}</div>}
     </div>);
   }
}

export default Collapsible;
