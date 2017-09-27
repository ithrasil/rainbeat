// React
import React, { Component } from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Axios
import Axios from 'axios';

// Actions 
import { executeQuery } from 'Actions/query.jsx';
import { changeReceiveStatus, updatePrimaryList, updateSecondaryList } from 'Actions/searchResult.jsx';
import { changeCard } from 'Actions/card.jsx';

// Constants
import { CLIENT_ID } from 'Constants/config.jsx';

// Containers
import Left from 'Containers/left/left.jsx';
import Middle from 'Containers/middle/middle.jsx';

class App extends Component { 
  
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
			
				this.props.changeCard(0);
			
				this.props.updateSecondaryList(songs);
				this.props.updatePrimaryList(songs);
			
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
    songs: state.searchResult.songs,
    received: state.searchResult.received,
    cardId: state.card.id
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    executeQuery: executeQuery,
    changeReceiveStatus: changeReceiveStatus,
    updatePrimaryList: updatePrimaryList,
    updateSecondaryList: updateSecondaryList,
    changeCard: changeCard
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);