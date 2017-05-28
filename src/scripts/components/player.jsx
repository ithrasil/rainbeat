import React from 'react';
import Swipe from 'react-easy-swipe';

import Card from './player subcomponents/card.jsx';
import Controls from './player subcomponents/controls.jsx';

import helpers from '../helpers.jsx';

class Player extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      activeSong: props.activeSong,
      songs: props.songs,
      client_id: props.client_id
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
    
    for (var i = 0; i < length; i++) {
      const song = this.state.songs[i];
      
      let isActive = false;
      
      if(this.state.activeSong.id == song.id) {
        isActive = true;
        artwork_url = this.state.activeSong.artwork_url;
      }
      
      cards.push(
        <Card 
          key={ i }
          song={ song } 
          onClick={ this.props.onClick } 
          isActive={ isActive }  
        />);
    }
    
    return(
      <div className="player_component">
        
        <div className="big_image" style={{ backgroundImage : 'url(' + artwork_url + ')' }}></div>
        <Swipe className="cards" onSwipeMove={ this.props.onSwipeMove }>
          <div className="wrapper">
            { cards }
            <div className="scrollbar">
              <div className="thumb"></div>
            </div>
          </div>
        </Swipe>
        <Controls activeSong={ this.state.activeSong } />
      </div>
    )
  }
}

export default Player;