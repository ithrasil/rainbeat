import React, { Component } from 'react';

// React modules
import ScrollArea from "react-scrollbar";

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { updateQueue } from 'Actions/queue.js';
import { changeCard } from 'Actions/card.js';

// Containers 
import Card from 'Containers/middle/tips/card.jsx';
import Error from 'Containers/middle/tips/error.jsx';
import Info from 'Containers/middle/tips/info.jsx';

// Helpers
import { assignCardId } from 'Helpers';

class Tips extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			songsActive: false,
			artistsActive: false,
			albumsActive: false,
			playlistsActive: false
		}
	}

	
	handleCardClick(id) { 
		let newQueue = this.props.queue.slice();
		const songs = this.props.songs;
		const song = songs[id];
		
		newQueue.push(song);
		this.props.updateQueue(newQueue);
		this.props.changeCard(newQueue.length-1);
	}

	render() {
    const length = this.props.songs.length;
		const searchStatus = this.props.searchStatus ? "active" : "";
		
		if(length == 0) {

			return(
				<ScrollArea 
          className={ "tips " + searchStatus }
          speed={ 1 }
          smoothScrolling={ true }
         >
         <Info/>
      	</ScrollArea>					
				
			)
		}
		
		let songs = [];
    
    for (var i = 0; i < length; i++) {
      const song = this.props.songs[i];
      
      songs.push(
        <Card 
          key={ i }
          id={ i }
          song={ song } 
          addToQueue={ this.handleCardClick.bind(this) }
        />);
    }
		
		return(
			<ScrollArea 
          className={ "tips " + searchStatus }
          speed={ 1 }
          smoothScrolling={ true }
         >
        <Info/>
        <div className={ "categoryWrapper " + (this.state.songsActive ? "active" : "") }>
        	<div className="type" onClick={()=> this.setState({ songsActive: !this.state.songsActive }) }>Songs</div>
        	<div className="results">{ songs }</div>
				</div>
       	<div className={ "categoryWrapper " + (this.state.artistsActive ? "active" : "") }>
        	<div className="type" onClick={()=> this.setState({ artistsActive: !this.state.artistsActive }) }>Artists</div>
        	<div className="results">{ songs }</div>
				</div>
       	<div className={ "categoryWrapper " + (this.state.albumsActive ? "active" : "") }>
        	<div className="type" onClick={()=> this.setState({ albumsActive: !this.state.albumsActive }) }>Albums</div>
        	<div className="results">{ songs }</div>
				</div>
				<div className={ "categoryWrapper " + (this.state.playlistsActive ? "active" : "") }>
					<div className="type" onClick={()=> this.setState({ playlistsActive: !this.state.playlistsActive }) }>Playlists</div>
					<div className="results">{ songs }</div>
				</div>
        
      </ScrollArea>
		)
		
	}
}

function mapStateToProps(state) {
  return {
    songs: state.search.secondaryList,
		searchStatus: state.search.status,
		queue: state.queue.list,
		index: state.card.id
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    updateQueue: updateQueue,
		changeCard: changeCard
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Tips);

