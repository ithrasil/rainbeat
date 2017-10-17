// React
import React, { Component } from 'react';

// Helpers
import { resizeArtwork } from 'Helpers';

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
		
		let artwork_url;
    
    if(this.state.song.artwork_url == "http://via.placeholder.com/50?text=cover") {
      artwork_url = this.state.song.artwork_url;
    }
    else {
      artwork_url = this.state.song.artwork_url ? resizeArtwork(this.state.song.artwork_url, 50) : "http://via.placeholder.com/50?text=cover";
    }
    
    let title = this.state.song.title;
		let shortTitle = title;

    if(title.length > 40) {
      shortTitle = title.substring(0, 40) + "...";
    }
    
    return(
      <div className="card" onClick={ this.handleClick.bind(this) } data-identity={ this.props.id }>
        <img className="artwork" src={ artwork_url } />
        <img className="add" src="/images/tips/add.svg"/>
        
        <div className="label">
          <span title={ title }>{ shortTitle }</span>
        </div>
      </div>
    )
  }
  
}


export default Card;