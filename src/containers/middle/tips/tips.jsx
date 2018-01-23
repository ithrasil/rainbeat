import React, { Component } from 'react';

// React modules
import ScrollArea from "react-scrollbar";

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { updateQueue } from 'Actions/queue.js';
import { changeCard } from 'Actions/card.js';
import { getArtistTracks, getPlaylistTracks } from 'Actions/search.js';

// Containers
import Track from 'Containers/middle/tips/cards/track.jsx';
import Artist from 'Containers/middle/tips/cards/artist.jsx';
import Playlist from 'Containers/middle/tips/cards/playlist.jsx';
import Error from 'Containers/middle/tips/error.jsx';
import Info from 'Containers/middle/tips/info.jsx';

// Helpers
import { assignCardId } from 'Helpers';

class Tips extends Component {

	constructor(props) {
		super(props);

		this.state = {
			tracksActive: false,
			artistsActive: false,
			albumsActive: false,
			playlistsActive: false
		}
	}
	
	changeTrack(track) {
		let newQueue = this.props.queue.slice();
		const tracks = this.props.tracks;
		
		newQueue.unshift(track);
		this.props.updateQueue({ list: newQueue, title: "Mixed" });
		this.props.changeCard(0);
	}

	handleArtistClick(id, index) {
		this.props.getArtistTracks(id, index, this.props.artists);
	}
	
	handlePlaylistClick(id, index) {
		this.props.getPlaylistTracks(id, index, this.props.playlists);
	}

	render() {

    const length = this.props.tracks.length;
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
		return(
			<ScrollArea className={ "tips " + searchStatus } speed={ 1 } smoothScrolling={ true }>
        <Info/>
        
        <div className={ "categoryWrapper " + (this.state.tracksActive ? "active" : "") }>
        	<div className="type" onClick={()=> this.setState((state, props) => { 
							return {
								tracksActive: !this.state.tracksActive
							}
						}) }>Tracks</div>
        	<div className="results">
					{
						this.props.tracks.map((track, index) => {
							return <Track key={ index } id={ index } track={ track } onClick={ this.changeTrack.bind(this) } />
						})
					}
        	</div>
				</div>
      	
       	<div className={ "categoryWrapper " + (this.state.artistsActive ? "active" : "") }>
        	<div className="type" onClick={()=> this.setState((state, props) => { 
							return { 
								artistsActive: !this.state.artistsActive 
							}
						}) }>Artists</div>
        	<div className="results">
					{
						
						this.props.artists.map((artist, index) => {
							return <Artist key={ index } index={ index } artist={ artist } tracks={ artist.tracks } loadTracks={ this.handleArtistClick.bind(this) } changeTrack={ this.changeTrack.bind(this) }/>
						})
					}
        	</div>
				</div>
      	
       	<div className={ "categoryWrapper " + (this.state.albumsActive ? "active" : "") }>
        	<div className="type" onClick={()=> this.setState((state, props) => { 
							return {
								albumsActive: !this.state.albumsActive
							}
						}) }>Albums</div>
        	<div className="results">{ 1 }</div>
				</div>
				
				<div className={ "categoryWrapper " + (this.state.playlistsActive ? "active" : "") }>
					<div className="type" onClick={()=> this.setState((state, props) => { 
							return {
								playlistsActive: !this.state.playlistsActive }
						}) }>Playlists</div>
					<div className="results">
					{
						
						this.props.playlists.map((playlist, index) => {
							return <Playlist key={ index } index={ index } playlist={ playlist } tracks={ playlist.tracks } loadTracks={ this.handlePlaylistClick.bind(this) } changeTrack={ this.changeTrack.bind(this) }/>
						})
					}
        	</div>
				</div>
				
      </ScrollArea>
		)

	}
}

function mapStateToProps(state) {
  return {
    tracks: state.search.tracks,
    artists: state.search.artists,
		playlists: state.search.playlists,
		searchStatus: state.search.status,
		queue: state.queue.list,
		index: state.card.id
  }
}

function matchDispatchToProps(dispatch) {
  let functions = {
    updateQueue: updateQueue,
		changeCard: changeCard,
		getArtistTracks: getArtistTracks,
		getPlaylistTracks: getPlaylistTracks
  };

  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Tips);
