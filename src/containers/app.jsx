// React
import React, { Component } from 'react';

// Containers
import Left from 'Containers/left/left.jsx';
import Middle from 'Containers/middle/middle.jsx';
import Right from 'Containers/right/right.jsx';

export default class App extends Component { 

  render() {
		return [
			<Left key="Left"/>,
			<Middle key="Middle"/>,
			<Right key="Right"/>
  	];
	}

}