// React
import React, { Component } from 'react';

export default class Info extends Component {
	
	constructor(props) {
    super(props);
  
    this.state = {
      playlist: props.playlist
    }
  }
	
  componentWillReceiveProps(props) {
		this.setState((state, props) => {
			return {
				playlist: props.playlist
			}
		})
	}
	
 	render() {
    return(
      <div className="info">
       	<div className="playlist label">
       		<span> { this.state.playlist }</span>
       	</div>
			</div>
    )
  }
}