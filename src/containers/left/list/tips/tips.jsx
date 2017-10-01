import React, { Component } from 'react';

// React modules
import ScrollArea from "react-scrollbar";

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { changeCard } from 'Actions/card.jsx';

// Containers 
import Card from 'Containers/left/list/tips/card.jsx';
import Error from 'Containers/left/list/tips/error.jsx';
import Info from 'Containers/left/list/tips/info.jsx';

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
		const searchStatus = this.props.searchStatus ? "active" : "";

		if(length == 0) {

			return(
				<ScrollArea 
          className={ "tips " + searchStatus }
          speed={ 1 }
          smoothScrolling={ true }
         >
          <Error key="0"/>
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
          songChange={ this.handleSongChange.bind(this) }
        />);
    }
		
		return(
			<ScrollArea 
          className={ "tips " + searchStatus }
          speed={ 1 }
          smoothScrolling={ true }
         >
        <Info/>
         { songs }
      </ScrollArea>
		)
		
	}
}

function mapStateToProps(state) {
	
  return {
    songs: state.searchResult.secondaryList,
		searchStatus: state.searchResult.searchStatus
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    changeCard: changeCard
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Queue);

