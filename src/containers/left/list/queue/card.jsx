// React
import React, { Component } from 'react';

// Helpers
import { resizeArtwork } from 'Helpers';

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
    this.setState({
      track: props.track,
      isActive: props.isActive ? "active" : "",
    });
  }
  
  handleClick() {
    if(this.state.isActive) return;
    this.props.trackChange("click", this.props.id);
  }
  
  render() {
    const cardClasses = "card " + this.state.isActive;
    
    let artwork_url;
    
    if(this.state.track.artwork_url == "http://via.placeholder.com/50?text=cover") {
      artwork_url = this.state.track.artwork_url;
    }
    else {
      artwork_url = this.state.track.artwork_url ? resizeArtwork(this.state.track.artwork_url, 50) : "http://via.placeholder.com/50?text=cover";
    }
	
		const playIcon = this.state.isActive ? BASE64_SPEAKER : BASE64_PLAY;
    
    let title = this.state.track.title;
		let shortTitle = title;

    if(title.length > 40) {
      shortTitle = title.substring(0, 40) + "...";
    }
    
    return(
      <div className={ cardClasses } onClick={ this.handleClick.bind(this) } data-identity={ this.props.id }>
        <div className="status" style={{backgroundImage: "url(" + playIcon+ ")" }}></div>
        <div className="label">
          <span title={ title }>{ shortTitle }</span>
        </div>
      </div>
    )
  }
  
}