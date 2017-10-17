import React, { Component } from 'react';

// React modules
import ScrollArea from "react-scrollbar";

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { changeCard } from 'Actions/card.js';

// Containers 
import Card from 'Containers/left/list/card.jsx';
import Error from 'Containers/left/list/error.jsx';

// Helpers
import { assignCardId } from 'Helpers';

class List extends Component {
	
  render() {
    const length = this.props.songs.length;

		if(length == 0) {

			return(
				<ScrollArea 
          className="list"
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
        />);
    }
		
		return(
			<ScrollArea 
          className="list"
          speed={ 1 }
          smoothScrolling={ true }
         >
          { cards }
      </ScrollArea>
		)
		
	}
}

function mapStateToProps(state) {
	
  return {
    cardId: state.card.id,
    songs: state.search.primaryList,
    activeSong: state.search.primaryList[state.card.id]
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    changeCard: changeCard
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(List);

