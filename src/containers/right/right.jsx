// React
import React, { Component } from 'react';

import { BASE64_BURGER, BASE64_EXIT } from 'Constants/images.js'

// Containers
import Tips from 'Containers/right/navigation.jsx';

export default class Right extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			visible: false
		}
	}
	
	changeVisibility() {
		this.setState((state, props) => { 
			return {
				visible: !this.state.visible 
			}
		})
	}
	
	render() {
		
		const visibility = this.state.visible ? "visible" : "";
		const status = this.state.visible ? BASE64_EXIT : BASE64_BURGER;
		
    return(
      
      <div className={ visibility + " right" } >
      	<div className="visibility" style={{ backgroundImage: "url(" + status + ")" }} onClick={ this.changeVisibility.bind(this) }></div>
      </div>
    )
		
  }
}