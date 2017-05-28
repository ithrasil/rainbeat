import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectSong } from '../actions/index.jsx';

class SongsList extends Component {
  
  createListItems() {
    return this.props.songs.map((song) => {
      return (
        <li 
          key={ song.id }
          onClick={() => this.props.selectSong(song) }
        >
          { song.title }
        </li>
      )
    });
  }
  
  render() {
    return (
      <ul>
        { this.createListItems()}
      </ul>
    )
  }
  
}

function mapStateToProps(state) {
  return {
    songs: state.songs
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ selectSong: selectSong }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SongsList);