import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeCard } from '../actions/card.jsx';

import Search from './search.jsx';

import Card from './player/card.jsx';
import Controls from './player/controls.jsx';

// Helpers
import { assignCardId } from '../helpers.jsx';


class Player extends React.Component {
  
  handleSongChange(type, value) { 
    let id = 0;
    const songs = this.props.songs;
    
    if(type == "end") {
      id = assignCardId('next', songs, this.props.cardId)
    }
    else {
      id = value;
    }

    this.props.changeCard(id);
  }

  render() {

    let cards = [];
    const length = this.props.songs.length;
    
    for (var i = 0; i < length; i++) {
      const song = this.props.songs[i];
      let isActive = (i == this.props.cardId);
      
      cards.push(
        <Card 
          key={ i }
          id={ i }
          song={ song } 
          songChange={ this.handleSongChange.bind(this) }
          isActive={ isActive }  
        />);
    }
    
    return(
      
      <div className="player_component">
        <Search  />
        <div className="cards" data-simplebar>
          { cards }
          <div className="scrollbar">
            <div className="thumb"></div>
          </div>
        </div>
        <Controls 
          activeSong={ this.props.activeSong } 
          stream={ this.props.stream } 
          songChange={ this.handleSongChange.bind(this) }
        />
      </div>
    )
  }
}

function mapStateToProps(state) {

  return {
    cardId: state.card.id,
    songs: state.songs.songs,
    activeSong: state.songs.songs[state.card.id]
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    changeCard: changeCard
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Player);