// React
import React, { Component } from 'react';

// Constants
import { BASE64_ADD } from "Constants/images.js"

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
		let shortTitle = title;

    if(title.length > 40) {
      shortTitle = title.substring(0, 40) + "...";
    }
		
		const source = this.state.track.source
    
    return(
      <div className="card" onClick={ this.handleClick.bind(this) }>
        <div className="add" style={{ backgroundImage: "url(" + BASE64_ADD + ")" }} ></div>
        <div className="source" title={ source } style={{ backgroundImage: `url(/images/sources/${source})` }} ></div>
        
        <div className="label">
          <span title={ title }>{ shortTitle }</span>
        </div>
      </div>
    )
  }
  
}