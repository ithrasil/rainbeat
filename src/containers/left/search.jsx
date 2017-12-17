// React
import React, { Component } from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { changeState, saveQuery, getData } from 'Actions/search.js';

// Constants
import { BASE64_LOUPE } from 'Constants/images.js'

class Search extends Component {
	
	handleOnKeyDown(event) {
		if(event.keyCode == 13) {
			this.props.getData(this.props.query);
		}
	}
	
  render() {

    return(
      <div className="search" >
				<label htmlFor="trackInput"> 
					<img aria-label="loupe for search" src={ BASE64_LOUPE } />
				</label>
				<input
					id="trackInput"
					type="text" 
					className="searchInput" 
					onFocus={ () => { 
							this.props.changeState(true);  
							this.props.saveQuery("") 
					  } 
					}
					placeholder="search"
			
					onInput={ this.props.saveQuery }
					onKeyDown={ this.handleOnKeyDown.bind(this) }
					value={ this.props.query.value }
				/>
      </div>
    )
    
  }
}

function mapStateToProps(state) {
  return {
    query: state.search.query
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    saveQuery: saveQuery,
		changeState: changeState,
		getData: getData
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Search);