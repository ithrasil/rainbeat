// React
import React, { Component } from 'react';

// Helpers
import { normalizeTitle } from 'Helpers';

// Constants
import { SMALL_PLACEHOLDER } from 'Constants/config.js'
import { BASE64_PLAY, BASE64_PAUSE, BASE64_SPEAKER } from 'Constants/images.js'

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
  
  handleClick() {
    if(this.state.isActive) return;
    this.props.trackChange("click", this.props.id);
  }
  
  render() {
		
    const cardClasses = "card " + this.state.isActive;
    
    let artwork_url = this.state.track.artwork_url;
	
		const playIcon = this.state.isActive ? BASE64_SPEAKER : BASE64_PLAY;
    const artist = this.state.track.artist;
		
    let title = normalizeTitle(this.state.track.title);
    
		if(this.state.isActive) {
			document.title = title;
		}
		
    return(
      <div className={ cardClasses } onClick={ this.handleClick.bind(this) } data-identity={ this.props.id }>
        <div className="status" style={{backgroundImage: "url(" + playIcon+ ")" }}></div>
        <div className="placeholder" style={{backgroundImage: "url(" + artwork_url+ ")" }}></div>
        <div className="meta">
       	  <div className="label">
						<span title={ title }>{ title }</span>
					</div>
        	<div className="artist">{ artist }</div>
        	
        </div>
        
      </div>
    )
  }
  
}