import React from 'react';
import Swipe from 'react-swipe';

import Card from './partials/card.jsx';
import DummyCard from './partials/dummyCard.jsx';
import FrozenCard from './partials/frozenCard.jsx';

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
    let artwork_url;
    const length = this.state.songs.length;
    const scope = helpers.setScope(length, this.state.activeSong.index);
    
    for (var i = -2; i < length+2; i++) {
      
      const isLoaded = i>=scope[0] && i<scope[1] ? true : false;
      const isFrozen = scope[0]>i+2 || scope[1]<i-1;
      const song = this.state.songs[i];
      
      if(i<0 || i>=length) {
        cards.push(
        <DummyCard isLoaded={ isLoaded } isFrozen={ isFrozen } />);
        continue;
      }
      
      if(isFrozen) {
        cards.push(
        <FrozenCard song={ song }  />);
        continue;
      }
      
      let isActive = false;
      
      if(this.state.activeSong.id == song.id) {
        isActive = true;
        artwork_url = this.state.activeSong.artwork_url;
      }
      
      cards.push(
        <Card 
          song={ song } 
          onClick={ this.props.onClick } 
          isActive={ isActive }  
          isLoaded={ isLoaded } 
          isFrozen={ isFrozen }
        />);
    }
    
    const backgroundImage = 'url(' + artwork_url + ')';
    
    return(
      <section className="player">
        <div className="background" style={{ backgroundImage }}></div>
      
        <Swipe className="cards" onSwipeMove={ this.props.onSwipeMove }>
          { cards }
        </Swipe>
        
        <Controls activeSong={ this.state.activeSong } />
      </section>
    )
  }
}

export default Player;