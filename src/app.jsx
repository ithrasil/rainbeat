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

// Constants
import { CLIENT_ID } from './constants/config.jsx';

// Containers
import Navigation from './containers/navigation.jsx';
import Player from './containers/player.jsx';
import BigImage from './containers/bigImage.jsx';

class App extends Component { 
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.handleQuery();
  }
  
  handleQuery() {
    
    const endpoint = `https://api.soundcloud.com/tracks?client_id=${ CLIENT_ID }&q=${this.props.query.value}&limit25`;
    
    Axios.get(endpoint)
      .then(response => {

        const songs = response.data;
        
        if(songs.length == 0) return;
        
        if(this.props.received) {
          this.props.changeReceiveStatus(false);
        }
        
        this.props.changeCard(0);
        this.props.updateSongs(songs);
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

    if(this.props.received) {
      
      const artwork_url = this.props.songs[this.props.cardId].artwork_url
      
      return(
        <div className="root">
          <Player />
          <BigImage artwork_url={ artwork_url } />
        </div>
      )
    }
    
    else {
      return(
        <div>
        
        </div>
      )
    }
  }
}

function mapStateToProps(state) {

  return {
    query: state.query,
    songs: state.songs.songs,
    received: state.songs.received,
    loaded: state.songs.loaded,
    songs: state.songs.songs,
    cardId: state.card.id
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    executeQuery: executeQuery,
    changeSongStatus: changeSongStatus,
    changeReceiveStatus: changeReceiveStatus,
    updateSongs: updateSongs,
    changeCard: changeCard
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);