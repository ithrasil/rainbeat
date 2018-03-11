// React
import React, { Component } from 'react';

// Helpers
import { normalizeTitle } from 'Helpers';

// Icons 
import { speakerIcon, playIcon, exitIcon } from "Containers/svg.jsx";

export default class Card extends Component {
  
  constructor(props) {
    super(props);
	
    this.state = {
      track: props.track,
      isActive: props.isActive ? "active" : "",
    }
  
  }
  
  componentWillReceiveProps(props) {
    this.setState((state, props) => {
			return {
				track: props.track,
				isActive: props.isActive ? "active" : ""
			}
    });
  }
  
  placeholderClick() {
    if(this.state.isActive) return;
    this.props.trackChange("click", this.props.id);
  }
	
	deleteClick() {
		this.props.trackDelete(this.props.id);
	}
  
  render() {
		
    const cardClasses = "card " + this.state.isActive;
    
    let artwork_url = this.state.track.artwork_url;
	
		const status = this.state.isActive ? speakerIcon({ fill: "white" }) : playIcon({ fill: "white" });
    const artist = this.state.track.artist;
		
    let title = normalizeTitle(this.state.track.name);
    
		if(this.state.isActive) {
			document.title = title;
		}
		
    return(
      <div className={ cardClasses }>
       
        <div className="placeholder" style={{backgroundImage: "url(" + artwork_url+ ")" }} onClick={ this.placeholderClick.bind(this) }>
        	<div className="status">
        		{ status }
        	</div>
        </div>
        
        <div className="left_panel">
      	  <div className="meta">
      	  	<div className="label">
							<span title={ title }>{ title }</span>
						</div>
						<div className="artist">{ artist }</div>
      	  </div>
       	  
        	
        	<div className="controls">
						<div className="delete" onClick={ this.deleteClick.bind(this) }>
							{ exitIcon({ fill: "red" }) }
						</div>
					</div>
        </div>
        
      </div>
    )
  }
  
}