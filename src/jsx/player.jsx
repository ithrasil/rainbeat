import React from 'react';

import Card from './partials/card.jsx';
import Controls from './partials/controls.jsx';
import helpers from '../helpers.jsx';

class Player extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      activeSong: this.props.activeSong,
      songs: this.props.songs,
      client_id: this.props.client_id
    }
    
  }
  
  componentWillReceiveProps(props) {

    this.state = {
      activeSong: props.activeSong,
      songs: props.songs,
      client_id: props.client_id
    }
  }
  
  render() {

    let cards = [];
    const length = this.state.songs.length;
    const scope = helpers.setScope(length, this.state.activeSong.index);
    
    for (var i = 0; i < length; i++) {
      const song = this.state.songs[i];
      const isActive = this.state.activeSong.id == song.id ? true : false;
      const isLoaded = i>=scope[0] && i<scope[1] ? true : false
      const isFrozen = scope[0]>i+2 || scope[1]<i-1;
      
      cards.push(<Card song={ song } onClick={ this.props.onClick } isActive={ isActive }  isLoaded={ isLoaded } isFrozen={ isFrozen }/>);
    }

    let artwork_url;

    if(this.state.activeSong.artwork_url != "https://unsplash.it/500") {
      artwork_url = helpers.resizeArtwork(this.state.activeSong.artwork_url, 500);
    }
    else {
      artwork_url = this.state.activeSong.artwork_url;
    }
    
    const backgroundImage = 'url(' + artwork_url + ')';
    
    return(
      <section className="player">
        <div className="background" style={{ backgroundImage }}></div>
        
        <div className="cards">
          { cards }
        </div>
        
        <Controls activeSong={ this.state.activeSong } />
        
      </section>
    )
  }
}

export default Player;