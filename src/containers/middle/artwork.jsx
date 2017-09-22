// React
import React, { Component } from 'react';

// Helpers
import { resizeArtwork } from 'Helpers';

class Artwork extends Component {
	
  constructor(props) {
    super(props);
    
    this.state = {
      url: props.url
    }
  }
  
  componentWillReceiveProps(props) {
		
    if(this.state.url != props.url) {
      this.setState({ url: props.url });
    }
  }
	
  render() {
    
    let artwork_url = this.state.url ? resizeArtwork(this.state.url, 500) : "http://via.placeholder.com/500?text=cover";

    return(
      <div className="artwork" style={{ backgroundImage : 'url(' + artwork_url + ')' }}></div>
    )
	}
}

export default Artwork;