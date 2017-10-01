// React
import React, { Component } from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { changeState } from 'Actions/searchResult.jsx';

class Info extends Component {
 	render() {
    return(
      <div className="info">
       	<div className="close_search" onClick={ ()=> { this.props.changeState(false)} }>
       		<img src="/images/icons/left-arrow.svg" alt=""/>
       		<span>Close search</span>
       	</div>
				<div className="filters">
					<div className="apis">
						<div className="api soundcloud" title="SoundCloud"></div>
						<div className="api lastfm" title="Last.fm"></div>
						<div className="api napster" title="Napster"></div>
						<div className="api tidal" title="Tidal"></div>
					</div>
					<div className="type"></div>
				 </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    changeState: changeState,
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Info);