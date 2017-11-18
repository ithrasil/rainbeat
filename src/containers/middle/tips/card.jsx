// React
import React, { Component } from 'react';

// Helpers
import { resizeArtwork } from 'Helpers';

// Constants
import { BASE64_ADD } from "Constants/images.js"

class Card extends Component {
  
  constructor(props) {
		
    super(props);
	
    this.state = {
      song: props.song
    }
  
  }
  
  componentWillReceiveProps(props) {
    this.setState({
      song: props.song
    });
  }
  
  handleClick() {
    if(this.state.isActive) return;
    this.props.addToQueue(this.props.id);
  }
  
  render() {
    
    let title = this.state.song.title;
		let shortTitle = title;

    if(title.length > 40) {
      shortTitle = title.substring(0, 40) + "...";
    }
    
    return(
      <div className="card" onClick={ this.handleClick.bind(this) } data-identity={ this.props.id }>
        <div className="add" style={{ backgroundImage: "url(" + BASE64_ADD + ")" }} ></div>
        
        <div className="label">
          <span title={ title }>{ shortTitle }</span>
        </div>
      </div>
    )
  }
  
}


export default Card;