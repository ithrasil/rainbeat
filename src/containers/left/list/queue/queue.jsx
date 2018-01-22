import React, { Component } from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { changeCard } from 'Actions/card';

// Containers 
import Card from 'Containers/left/list/queue/card.jsx';
import Error from 'Containers/left/list/queue/error.jsx';
import Info from 'Containers/left/list/queue/info.jsx';

// Helpers
import { assignCardId } from 'Helpers';

class Queue extends Component {
	
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

    const length = this.props.tracks.length;
		const searchStatus = "active"; // it is for future update

		if(length == 0) {

			return(
				<div className="queue">
          <Error key="0"/>
      	</div>
			)
		}
		
		return(
			<div className={ "queue " + searchStatus }>
        <Info playlist={ this.props.title } />
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
      </div>
		)
		
	}
}

function mapStateToProps(state) {
	
  return {
    cardId: state.card.id,
    tracks: state.queue.list,
		searchStatus: state.search.status,
		title: state.queue.title
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    changeCard: changeCard
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Queue);

