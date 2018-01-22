// React
import React, { Component } from 'react';

// Constants
import { BASE64_PLAYLIST } from 'Constants/images.js'

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
       		<img src={ BASE64_PLAYLIST }alt=""/>
       		<span> { this.state.playlist }</span>
       	</div>
			</div>
    )
  }
}