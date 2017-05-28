import React, { Component } from 'react';
import { connect } from 'react-redux';

class SongDetail extends Component {
  
  render() {
    if(!this.props.song) {
      return (<h4>Select a user...</h4>);
    }
    return(
      <div>
        <img src={ this.props.song.artwork_url } />
        <h2>{ this.props.song.title }</h2>
      </div>  
    )
  }
  
}

function mapStateToProps(state) {
  return {
    song: state.activeSong
  }
}

export default connect(mapStateToProps)(SongDetail);