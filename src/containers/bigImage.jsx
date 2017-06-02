import React, { Component } from 'react';
import update from 'react-addons-update';

class BigImage extends Component {
	
  constructor(props) {
    super(props);
    
    this.state = {
      artwork_url: props.artwork_url
    }
  }
  
  componentWillReceiveProps(props) {
    this.setState({
      artwork_url: props.artwork_url
      
    });
    
  }
	
  render() {
    return(
      <div className="big_image" style={{ backgroundImage : 'url(' + this.state.artwork_url + ')' }}></div>
    )
  
  }
	
}

export default BigImage;