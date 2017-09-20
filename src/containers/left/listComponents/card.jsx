// React
import React, { Component } from 'react';

// Helpers
import { resizeArtwork } from 'Helpers';

class Card extends Component {
  
  constructor(props) {
    super(props);
	
    this.state = {
      song: props.song,
      isActive: props.isActive ? "active" : "",
    }
  
  }
  
  componentWillReceiveProps(props) {
    this.setState({
      song: props.song,
      isActive: props.isActive ? "active" : "",
    });
  }
  
  handleClick() {
    if(this.state.isActive) return;
    this.props.songChange("click", this.props.id);
  }
  
  render() {
    const cardClasses = "card " + this.state.isActive;
    
    let artwork_url;
    
    if(this.state.song.artwork_url == "http://via.placeholder.com/50?text=cover") {
      artwork_url = this.state.song.artwork_url;
    }
    else {
      artwork_url = this.state.song.artwork_url ? resizeArtwork(this.state.song.artwork_url, 50) : "http://via.placeholder.com/50?text=cover";
    }
    
    let title = this.state.song.title;

    if(title.length > 40) {
      title = title.substring(0, 40) + "...";
    }
    
    return(
      <div className={ cardClasses } onClick={ this.handleClick.bind(this) } data-identity={ this.props.id }>
        <img className="artwork" src={ artwork_url } />
        <div className="label">
          <span>{ title }</span>
        </div>
      </div>
    )
  }
  
}


export default Card;