// React
import React, { Component } from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { saveQuery, executeQuery } from 'Actions/query.jsx';
import { changeState } from 'Actions/searchResult.jsx';

class Search extends Component {
	
	handleOnKeyDown(event) {
		if(event.keyCode == 13) {
			this.props.executeQuery(true) 
		}
	}
	
  render() {
    return(
      <div className="search" >
				<label htmlFor="songInput"> 
					<img src="/images/icons/search.svg" />
				</label>
				<input
					id="songInput"
					type="text" 
					className="searchInput" 
					onFocus={ () => { this.props.changeState(true) } }
					onInput={ this.props.saveQuery }
					onKeyDown={ this.handleOnKeyDown.bind(this) }
					defaultValue={ this.props.query.value }
				/>
      </div>
    )
    
  }
}

function mapStateToProps(state) {
  return {
    query: state.query
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    saveQuery: saveQuery,
    executeQuery: executeQuery,
		changeState: changeState
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Search);