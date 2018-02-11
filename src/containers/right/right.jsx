// React
import React, { Component } from 'react';

// Icons
import { burgerIcon, exitIcon } from "Containers/svg.jsx";

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
		
    return(
      <div className={ visibility + " right" } >
      	<div className="visibility" onClick={ this.changeVisibility.bind(this) }>
      		{ this.state.visible ? exitIcon({fill: "black"}) : burgerIcon({fill: "black"}) }
      	</div>
      </div>
    )
		
  }
}