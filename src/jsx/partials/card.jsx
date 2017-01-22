import React from 'react';

import helpers from '../../helpers.jsx';

class Card extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      song: this.props.song,
      isActive: this.props.isActive ? "active" : "",
      isLoaded: this.props.isLoaded ? "card-loaded" : "",
      isFrozen: this.props.isFrozen ? "card-frozen" : ""
    }

  }
  
  componentWillReceiveProps(props) {
    this.setState({
      isActive: props.isActive ? "active" : "",
      isLoaded: props.isLoaded ? "card-loaded" : "",
      isFrozen: props.isFrozen ? "card-frozen" : ""
    });
  }
  
  render() {
    const cardClasses = "card " + this.state.isActive + " " +  this.state.isLoaded + " " + this.state.isFrozen;
    
    let artwork_url;
    
    if(this.state.song.artwork_url == "https://unsplash.it/500") {
      artwork_url = this.state.song.artwork_url;
    }
    else {
      artwork_url = this.state.song.artwork_url ? helpers.resizeArtwork(this.state.song.artwork_url, 500) : "https://unsplash.it/500";
    }
    
    let title = this.state.song.title;

    if(title.length > 40) {
      title = title.substring(0, 40) + "...";
    }
    
    return(
      <div className={ cardClasses } onClick={ this.props.onClick } >
        <div className="dataset" data-id={ this.state.song.id } data-title={ this.state.song.title } data-artwork_url={ artwork_url } data-stream_url={ this.state.song.stream_url }></div>
        <img src={ artwork_url } />
        <div className="label">
          <span>{ title }</span>
        </div>
      </div>
    )
  }
  
}

export default Card;
