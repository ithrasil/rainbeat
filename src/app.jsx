// React
import React, { Component } from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Axios
import Axios from 'axios';

// Actions 
import { executeQuery } from './actions/query.jsx';
import { changeSongStatus, changeReceiveStatus, updateSongs } from './actions/songs.jsx';
import { changeCard } from './actions/card.jsx';
import { updateStream } from './actions/stream.jsx';

// Containers
import Navigation from './containers/navigation.jsx';
import Player from './containers/player.jsx';

// Helpers
import { assignCardId } from './helpers.jsx';

class App extends Component { 
  
  componentDidMount() {
    this.handleQuery();
  }
  
  handleQuery() {
    
    if(this.props.songs.songLoaded == false) return;
    
    const endpoint = `https://api.soundcloud.com/tracks?client_id=${this.props.clientId}&q=${this.props.query.value}&limit15`;
    
    Axios.get(endpoint)
      .then(response => {

        const songs = response.data;
        
        if(songs.length == 0) return;
        
        if(this.props.songs.received) {
          this.props.stream.pause();
          this.props.changeReceiveStatus(false);
        }
        
        this.props.changeCard(0);
      
        let song = songs[0];
      
        if(song.artwork_url == null) {
          song.artwork_url = "https://unsplash.it/300";
        }
        
        this.props.updateStream([song.stream_url, this.props.clientId])
        this.props.changeSongStatus(false);
        this.props.updateSongs(songs);
      
        this.props.stream.addEventListener('canplay', () => {
          this.props.changeSongStatus(true);
        });
        
        this.props.stream.addEventListener('ended', () => {
          const cardId = assignCardId('next', this.props.songs.songs, this.props.cardId);
          this.props.changeCard(cardId);
        });
        
        this.props.changeReceiveStatus(true);
        
    });
  }
  
  handleKeyDown(e) {
    if(e.keyCode == 13) {
      this.handleQuery();
    }
  }

  render() {
    if(this.props.query.execution) {
      this.props.executeQuery(false);
      this.handleQuery();
    }

    if(this.props.songs.received) {
      return(
        <Player />
      )
    }
    
    else {
      return(
        <div>
          empty data
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    query: state.query,
    clientId: state.config.clientId,
    songs: state.songs,
    cardId: state.card.id,
    stream: state.stream.stream
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    executeQuery: executeQuery,
    changeSongStatus: changeSongStatus,
    changeReceiveStatus: changeReceiveStatus,
    updateSongs: updateSongs,
    changeCard: changeCard,
    updateStream: updateStream
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);