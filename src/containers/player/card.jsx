import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeCard } from '../../actions/card.jsx';
import { updateStream } from '../../actions/stream.jsx';

import helpers from '../../helpers.jsx';

class Card extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      song: this.props.song,
      isActive: this.props.isActive ? "active" : "",
    }
    

  }
  
  componentWillReceiveProps(props) {
    this.setState({
      isActive: props.isActive ? "active" : "",
    });
  }
  
  handleClick() { 
    const id = this.props.id;
    const songs = this.props.songs.songs;
    this.props.changeCard(id);
    this.props.updateStream([songs[id].stream_url, this.props.config.clientId]);
  }
  
  render() {
    const cardClasses = "card " + this.state.isActive;
    
    let artwork_url;
    
    if(this.state.song.artwork_url == "https://unsplash.it/300") {
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
      <div className={ cardClasses } onClick={ this.handleClick.bind(this) }>
        <img className="artwork" src={ artwork_url } />
        <div className="label">
          <span>{ title }</span>
        </div>
      </div>
    )
  }
  
}

function mapStateToProps(state) {
  return {
    songs: state.songs,
    config: state.config
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    changeCard: changeCard,
    updateStream: updateStream
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Card);