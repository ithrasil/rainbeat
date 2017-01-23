import React from 'react';

import helpers from '../../helpers.jsx';

class FrozenCard extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      song: this.props.song,
    }

  }
  
  render() {
    
    let artwork_url;
    
    if(this.state.song.artwork_url == "https://unsplash.it/400") {
      artwork_url = this.state.song.artwork_url;
    }
    else {
      artwork_url = this.state.song.artwork_url ? helpers.resizeArtwork(this.state.song.artwork_url, 300) : "https://unsplash.it/300";
    }
    
    let title = this.state.song.title;

    if(title.length > 40) {
      title = title.substring(0, 40) + "...";
    }
    
    return(
      <div className="card frozen">
        <div className="dataset" data-id={ this.state.song.id } data-title={ this.state.song.title } data-artwork_url={ artwork_url } data-stream_url={ this.state.song.stream_url } onClick={ this.props.onClick }></div>
      </div>
    )
  }
  
}

export default FrozenCard;
