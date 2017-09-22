// React
import React, { Component } from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Axios
import Axios from 'axios';

// Actions 
import { executeQuery } from 'Actions/query.jsx';
import { changeSongStatus, changeReceiveStatus, updateSongs } from 'Actions/songs.jsx';
import { changeCard } from 'Actions/card.jsx';

// Constants
import { CLIENT_ID } from 'Constants/config.jsx';

// Containers
import Left from 'Containers/left/index.jsx';
import Middle from 'Containers/middle/index.jsx';

class App extends Component { 
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.handleQuery();
  }
  
  handleQuery() {
    
    const endpoint = `https://api.soundcloud.com/tracks?client_id=${ CLIENT_ID }&q=${this.props.query.value}`;
    
    Axios.get(endpoint)
      .then(response => {
        const songs = response.data;

        if(songs.length == 0) return;
        
        if(this.props.received) {
          this.props.changeReceiveStatus(false);
        }
			
        this.props.updateSongs(songs);
        this.props.changeReceiveStatus(true);
        
    });
  }
  
  handleKeyDown(event) {
    if(event.keyCode == 13) {
      this.handleQuery();
    }
  }

  render() {
    if(this.props.query.execution) {
      this.props.executeQuery(false);
      this.handleQuery();
    }

    return(
      <div className="root">
        <Left />
				<Middle />
      </div>
    )
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