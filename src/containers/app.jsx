// React
import React, { Component } from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions 
import { updatePrimaryList, getData } from 'Actions/search.js';
import { changeCard } from 'Actions/card.js';

// Containers
import Left from 'Containers/left/left.jsx';
import Middle from 'Containers/middle/middle.jsx';

class App extends Component { 
  
  componentDidMount() {
    this.props.getData(this.props.query);
  } 

  render() {
		console.log('app')
    return(
      <div className="root">
        <Left />
				<Middle />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    query: state.search.query,
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    getData: getData
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);