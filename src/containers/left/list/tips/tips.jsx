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
import Card from 'Containers/left/list/tips/card.jsx';
import Error from 'Containers/left/list/tips/error.jsx';
import Info from 'Containers/left/list/tips/info.jsx';

// Helpers
import { assignCardId } from 'Helpers';

class Tips extends Component {
	
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
		const searchStatus = !this.props.searchStatus ? "active" : "";
		
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
         { songs }
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

