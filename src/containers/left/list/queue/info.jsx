// React
import React, { Component } from 'react';

class Info extends Component {
	
	constructor(props) {
    super(props);
  
    this.state = {
      playlist: props.playlist
    }
  }
	
  componentWillReceiveProps(props) {
		this.setState({
			playlist: props.playlist
		})
	}
	
 	render() {
    return(
      <div className="info">
       
        <div className="description">
          <span>Current playlist: { this.state.playlist }</span>
        </div>
      </div>
    )
  }
}

export default Info;