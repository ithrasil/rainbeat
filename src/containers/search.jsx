import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { saveQuery, executeQuery } from '../actions/query.jsx';

class Search extends Component {

  render() {
    return(
      <div className="search" >

        <label htmlFor="songInput"> <img src="/images/icons/search.svg" /></label>

        <input 
          type="text" 
          className="searchInput" 
          id="songInput" 
          onInput={ this.props.saveQuery }
          onKeyDown={(event) => { if(event.keyCode == 13) this.props.executeQuery(true) } }
          value={ this.props.query.text } 
          ref={ (songInput) => { this.songInput = songInput; }}
        />

        <button onClick={() => this.props.executeQuery(true) }>Wyszukaj</button>

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