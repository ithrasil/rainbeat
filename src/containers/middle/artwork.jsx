// React
import React, { Component } from 'react';

// Helpers
import { resizeArtwork, preloadImage } from 'Helpers';

class Artwork extends Component {
	
  constructor(props) {
    super(props);
    
    this.state = {
      primary: props.url,
			secondary: "",
			active: 1
    }
  }
  
  componentWillReceiveProps(props) {
		
		if(this.state.active == 1) {
			this.setState({ 
				secondary: props.url,
				active: 0
			});
		}
		
		else {
			this.setState({ 
				primary: props.url,
				active: 1
			});
		}
		
  }
	
  render() {
    
    let primary = {
			backgroundImage: 'url(' + (this.state.primary ? resizeArtwork(this.state.primary, 500) : "http://via.placeholder.com/500?text=cover") + ')'
		};
		
		let secondary = {
			backgroundImage: 'url(' + (this.state.secondary ? resizeArtwork(this.state.secondary, 500) : "http://via.placeholder.com/500?text=cover") + ')'
		};
		
		let primary_classes = this.state.active ? "sprite active" : "sprite";

    return(
			
      <div className="artwork">
				<div className={ primary_classes } style={ primary }></div>
				<div className="sprite" style={ secondary }></div>
			
			</div>
    )
	}
}

export default Artwork;