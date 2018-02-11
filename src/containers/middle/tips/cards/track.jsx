// React
import React, { Component } from 'react';

// Icons
import { addIcon } from "Containers/svg.jsx"

export default class Track extends Component {
  
  constructor(props) {
    super(props);
	
    this.state = {
      track: props.track
    }
  }
  
  componentWillReceiveProps(props) {
    this.setState((state, props) => {
			return {
				track: props.track
			}
    });
  }
  
  handleClick() {
    if(this.state.isActive) return;
    this.props.onClick(this.state.track);
  }
  
  render() {
    
    let title = this.state.track.title;
		
		const source = this.state.track.source
    
    return(
      <div className="card" onClick={ this.handleClick.bind(this) }>
        { addIcon({fill: "white"}) }
        <div className="source"  style={{ backgroundImage: `url(/images/sources/${source})` }} ></div>
        
        <div className="label">
          <span title={ title }>{ title }</span>
        </div>
      </div>
    )
  }
  
}