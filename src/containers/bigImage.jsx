// React
import React, { Component } from 'react';

// Helpers
import { resizeArtwork } from '../helpers.jsx';

class BigImage extends Component {
	
  constructor(props) {
    super(props);
    
    this.state = {
      artwork_url: props.artwork_url
    }
  }
  
  componentWillReceiveProps(props) {
    if(this.state.artwork_url != props.artwork_url) {
      this.setState({ artwork_url: props.artwork_url });
    }
    
  }
	
  render() {
    
    let artwork_url;
    
    artwork_url = this.state.artwork_url ? resizeArtwork(this.state.artwork_url, 500) : "http://via.placeholder.com/500?text=cover";

    
    return(
      <div className="big_image" style={{ backgroundImage : 'url(' + artwork_url + ')' }}></div>
    )
  
  }
	
}

export default BigImage;