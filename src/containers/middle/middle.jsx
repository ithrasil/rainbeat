// React
import React, { Component } from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { changeCard } from 'Actions/card';

// Containers
import Artwork from 'Containers/middle/artwork.jsx';
import Dashboard from 'Containers/middle/dashboard.jsx';
import Tips from 'Containers/middle/tips/tips.jsx';

// Helpers
import { assignCardId } from 'Helpers';

class Middle extends Component { 
	
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
		
		if(this.props.songs.length == 0) {
			return(
				<section className="middle">
					<Tips />
				</section>
			)
		}
		
		const artwork_url = this.props.songs[this.props.cardId].artwork_url;
		const active_song = this.props.songs[this.props.cardId];
		
		return(
			<section className="middle">
				<Tips />
				<Artwork url={ artwork_url }></Artwork>
				<Dashboard 
					activeSong={ active_song } 
          stream={ this.props.stream } 
          songChange={ this.handleSongChange.bind(this) }>
				</Dashboard>
			</section>
		) 
	}
}

function mapStateToProps(state) {
  return {
		cardId: state.card.id,
    songs: state.queue.list
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    changeCard: changeCard
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Middle);