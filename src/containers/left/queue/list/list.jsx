import React, { Component } from 'react';

// React modules
import ScrollArea from "react-scrollbar";

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { changeCard } from 'Actions/card';

// Containers 
import Card from 'Containers/left/queue/list/card.jsx';

// Helpers
import { assignCardId } from 'Helpers';

class List extends Component {
	
	handletrackChange(type, value) { 
    let id = 0;
    const tracks = this.props.tracks;
    
    if(type == "end") {
      id = assignCardId('next', tracks, this.props.cardId-1)
    }
    else {
      id = value;
    }

    this.props.changeCard(id);
  }

  render() {
		
		return(
			<ScrollArea className="list" speed={ 1 } smoothScrolling={ true }>
			{
				this.props.tracks.map((track, index) => {
					let isActive = (index == this.props.cardId);

					return (
						<Card 
							key={ index }
							id={ index }
							track={ track } 
							trackChange={ this.handletrackChange.bind(this) }
							isActive={ isActive }  
						/>
					);
				})
			}
			</ScrollArea>
		)
		
	}
}

function mapStateToProps(state) {
	
  return {
    cardId: state.card.id,
    tracks: state.queue.list
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    changeCard: changeCard
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(List);

