// React
import React, { Component } from 'react';

import { BASE64_BURGER, BASE64_EXIT_BLACK } from 'Constants/images.js'

class Right extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			visible: false
		}
	}
	
	changeVisibility() {
		this.setState({ visible: !this.state.visible })
	}
	
	render() {
		
		const visibility = this.state.visible ? "visible" : "";
		const status = this.state.visible ? BASE64_EXIT_BLACK : BASE64_BURGER;
		
    return(
      
      <div className={ visibility + " right" } >
      	<div className="visibility" style={{ backgroundImage: "url(" + status + ")" }} onClick={ this.changeVisibility.bind(this) }></div>
      </div>
    )
		
  }
}

export default Right;