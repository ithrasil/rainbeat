import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Search from './search.jsx';

import Card from './player/card.jsx';
import Controls from './player/controls.jsx';

import helpers from '../helpers.jsx';

class Player extends React.Component {

  render() {

    let cards = [];
    let artwork_url;
    const length = this.props.songs.songs.length;
    
    for (var i = 0; i < length; i++) {
      const song = this.props.songs.songs[i];
      let isActive = false;
      
      if(i == this.props.cardId) {
        isActive = true;
        artwork_url = this.props.songs.songs[i].artwork_url;
      }
      
      cards.push(
        <Card 
          key={ i }
          id={ i }
          song={ song } 
          onClick={ this.props.onClick } 
          isActive={ isActive }  
        />);
    }
    
    return(
      
      <div className="player_component">
        <div className="big_image" style={{ backgroundImage : 'url(' + artwork_url + ')' }}></div>
        <Search  />
        <div className="cards">
          <div className="wrapper">
            { cards }
            <div className="scrollbar">
              <div className="thumb"></div>
            </div>
          </div>
        </div>
        <Controls activeSong={ this.props.activeSong } stream={ this.props.stream }/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cardId: state.card.id,
    songs: state.songs,
    stream: state.stream.stream,
    activeSong: state.songs.songs[state.card.id]
  }
}

export default connect(mapStateToProps)(Player);