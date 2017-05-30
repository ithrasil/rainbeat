import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Axios from 'axios';

import { executeQuery } from './actions/query.jsx';
import { updateActiveSong, changeSongStatus, changeReceiveStatus, updateSongs } from './actions/songs.jsx';

import Navigation from './containers/navigation.jsx';
import Player from './containers/player.jsx';

import helpers from './helpers.jsx';

class App extends Component { 
  
  componentDidMount() {
    this.handleQuery();
  }
  
  handleQuery() {
    
    if(this.props.songs.songLoaded == false) return;
    
    const endpoint = `https://api.soundcloud.com/tracks?client_id=${this.props.config.clientId}&q=${this.props.query.value}&limit15`;
    
    Axios.get(endpoint)
      .then(response => {

        const songs = response.data
        
        if(songs.length == 0) return;
        
        if(this.props.songs.received) {
          this.props.songs.activeSong.stream.pause();
          this.props.changeReceiveStatus(false);
        }
      
        const index = 0;
        let song = songs[index];
      
        if(song.artwork_url == null) {
          song.artwork_url = "https://unsplash.it/300";
        }
        
        const newActiveSong = {
          id: song.id,
          artwork_url: song.artwork_url,
          stream: helpers.createStream(song.stream_url, this.props.config.clientId),
          title: song.title,
          index: index
        }
        
        this.props.changeSongStatus(false);
        this.props.updateActiveSong(newActiveSong);
        this.props.updateSongs(songs);
      
        this.props.songs.activeSong.stream.addEventListener('canplay', () => {
          this.props.changeSongStatus(true);
        })
        
        this.props.songs.activeSong.stream.addEventListener('ended', () => {
          this.handleChangeCard('next');
        })
        
        this.props.changeReceiveStatus(true);
        
    });
  }
  
  handleChangeCard(direction) {
    if(this.props.songs.songLoaded == false) console.log("not loaded yet");
    
    this.props.executeQuery(true);
    
    const oldActiveCard = document.querySelector('.card.active');
    const cardsList = document.querySelectorAll('.card');
    
    const newActiveCard = helpers.assignCard(direction, cardsList, oldActiveCard);

    const dataset = newActiveCard.children[1].dataset;

    if(oldActiveCard != newActiveCard) {
      const cardsArr = Array.prototype.slice.call(cardsList, 0); 
      const index = cardsArr.indexOf(newActiveCard);
      
      this.props.songs.activeSong.stream.pause();
      
      let newStream = this.props.songs.activeSong.stream;
    
      newStream.src = dataset.stream_url + "?client_id=" + this.props.config.clientId;
      
      const newActiveSong = {
        id: dataset.id,
        artwork_url: dataset.artwork_url,
        stream: newStream,
        title: dataset.title,
        index: index-2
      }
      
      this.props.updateActiveSong(newActiveSong);
      this.props.changeSongStatus(false);
      
      this.props.songs.activeSong.stream.addEventListener('canplay', () => {
        this.props.changeSongStatus(true);
      })
      
      this.props.songs.activeSong.stream.addEventListener('ended', () => {
        this.handleChangeCard('next');
      })
      
    }
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
        <div>

          <Player 
            onClick={ this.handleChangeCard.bind(this) } 
          />
          
        </div>
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
    config: state.config,
    songs: state.songs
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    executeQuery: executeQuery,
    updateActiveSong: updateActiveSong, 
    changeSongStatus: changeSongStatus,
    changeReceiveStatus: changeReceiveStatus,
    updateSongs: updateSongs
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);