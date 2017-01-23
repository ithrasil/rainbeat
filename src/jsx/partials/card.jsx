import React from 'react';

import helpers from '../../helpers.jsx';

class Card extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      song: this.props.song,
      isActive: this.props.isActive ? "active" : "",
      isLoaded: this.props.isLoaded ? "loaded" : "",
      isFrozen: this.props.isFrozen ? "frozen" : ""
    }

  }
  
  componentWillReceiveProps(props) {
    this.setState({
      isActive: props.isActive ? "active" : "",
      isLoaded: props.isLoaded ? "loaded" : "",
      isFrozen: props.isFrozen ? "frozen" : ""
    });
  }
  
  render() {
    const cardClasses = "card " + this.state.isActive + " " +  this.state.isLoaded + " " + this.state.isFrozen;
    
    let artwork_url;
    
    if(this.state.song.artwork_url == "https://unsplash.it/300") {
      artwork_url = this.state.song.artwork_url;
    }
    else {
      artwork_url = this.state.song.artwork_url ? helpers.resizeArtwork(this.state.song.artwork_url, 300) : "https://unsplash.it/300";
    }
    
    let title = this.state.song.title;

    if(title.length > 40) {
      title = title.substring(0, 40) + "...";
    }
    
    return(
      <div className={ cardClasses } >
        <div className="dataset" data-id={ this.state.song.id } data-title={ this.state.song.title } data-artwork_url={ artwork_url } data-stream_url={ this.state.song.stream_url } onClick={ this.props.onClick }></div>
        <img src={ artwork_url } />
        <div className="label">
          <span>{ title }</span>
        </div>
      </div>
    )
  }
  
}

export default Card;
