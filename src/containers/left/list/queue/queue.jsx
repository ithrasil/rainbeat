import React, { Component } from 'react';

// React modules
import ScrollArea from "react-scrollbar";

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { changeCard } from 'Actions/card.jsx';

// Containers 
import Card from 'Containers/left/list/queue/card.jsx';
import Error from 'Containers/left/list/queue/error.jsx';
import Info from 'Containers/left/list/queue/info.jsx';

// Helpers
import { assignCardId } from 'Helpers';

class Queue extends Component {
	
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

    const length = this.props.songs.length;

		if(length == 0) {

			return(
				<ScrollArea 
          className="queue"
          speed={ 1 }
          smoothScrolling={ true }
         >
          <Error key="0"/>
      	</ScrollArea>					
				
			)
		}
		
		let cards = [];
    
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
      	/>
			);
    }
		
		return(
			<ScrollArea 
          className="queue"
          speed={ 1 }
          smoothScrolling={ true }
         >
         	<Info playlist="dummy"/>
          { cards }
      </ScrollArea>
		)
		
	}
}

function mapStateToProps(state) {
	
  return {
    cardId: state.card.id,
    songs: state.searchResult.primaryList,
    activeSong: state.searchResult.primaryList[state.card.id]
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    changeCard: changeCard
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Queue);

