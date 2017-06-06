// React
import React, { Component } from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { saveQuery, executeQuery } from '../../actions/query.jsx';

class Search extends Component {

  render() {
    return(
      <div className="search" >
        <div className="wrapper">
          <label htmlFor="songInput"> 
            <img src="/images/icons/search.svg" />
          </label>
          <input
            type="text" 
            className="searchInput" 
            onInput={ this.props.saveQuery }
            onKeyDown={ (event) => { if(event.keyCode == 13) this.props.executeQuery(true) } }
            defaultValue={this.props.query.value}
          />
        </div>
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
    executeQuery: executeQuery
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Search);