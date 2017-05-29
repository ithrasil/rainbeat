import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { executeQuery } from '../actions/query.jsx';

import Navigation from './components/navigation.jsx';
import Player from './components/player.jsx';

import helpers from './helpers.jsx';

class App extends React.Component { 
  
  constructor(props) {
    super(props);
    
    this.state = {
      activeSong: [],
      songs: [],
      dataReceived: false,
      client_id: "stJqxq59eT4rgFHFLYiyAL2BDbuL3BAv",
      songLoaded: true,
      searchActive: true
    }
  }
  
  componentDidMount() {
    this.handleQuery();
  }
  
  handleQuery() {
    if(this.state.songLoaded == false || this.props.query.text == this.state.loadedQuery) return;
    
    const searchModule = document.querySelector('#search');
    const endpoint = `https://api.soundcloud.com/tracks?client_id=${this.state.client_id}&q=${this.props.query.text}&limit15`;
    
    fetch(endpoint)
      .then(blob => blob.json())
      .then(songs => {
        
        if(songs.length == 0) return;
        
        if(this.state.dataReceived) {
          this.state.activeSong.stream.pause();
          this.setState({dataReceived: false});
        }
      
        const index = 0;
        let song = songs[index];
      
        if(song.artwork_url == null) {
          song.artwork_url = "https://unsplash.it/300";
        }
        
        const newActiveSong = {
          id: song.id,
          artwork_url: song.artwork_url,
          stream: helpers.createStream(song.stream_url, this.state.client_id),
          title: song.title,
          index: index
        }

        this.setState( 
          {
            activeSong: newActiveSong,
            songs: songs, 
            dataReceived: true,
            songLoaded: false,
            loadedQuery: this.props.query.text
          } 
        );
      
        this.state.activeSong.stream.addEventListener('canplay', () => {
          this.state.songLoaded = true
        })
        
        this.state.activeSong.stream.addEventListener('ended', () => {
          this.handleChangeCard('next');
        })
        
    });
  }
  
  handleChangeCard(direction) {
    if(this.state.songLoaded == false) console.log(1);
    
    this.props.executeQuery(true);
    
    const oldActiveCard = document.querySelector('.card.active');
    const cardsList = document.querySelectorAll('.card');
    
    const newActiveCard = helpers.assignCard(direction, cardsList, oldActiveCard);
    
    console.log(newActiveCard);

    const dataset = newActiveCard.children[1].dataset;

    if(oldActiveCard != newActiveCard) {
      const cardsArr = Array.prototype.slice.call(cardsList, 0); 
      const index = cardsArr.indexOf(newActiveCard);
      
      this.state.activeSong.stream.pause();
      
      let newStream = this.state.activeSong.stream;
    
      newStream.src = dataset.stream_url + "?client_id=" + this.state.client_id;
      
      const newActiveSong = {
        id: dataset.id,
        artwork_url: dataset.artwork_url,
        stream: newStream,
        title: dataset.title,
        index: index-2
      }
      
      this.setState(
        { 
          activeSong: newActiveSong,
          songLoaded: false
        }
      );
      
      this.state.activeSong.stream.addEventListener('canplay', () => {
        this.state.songLoaded = true;
      })
      
      this.state.activeSong.stream.addEventListener('ended', () => {
        this.handleChangeCard('next');
      })
      
    }
  }
  
  handleMove(position) {
    const direction = position.x > 0 ? "prev" : "next";
    this.handleChangeCard(direction);
  }
  
  handleKeyDown(e) {
    if(e.keyCode == 13) {
      this.handleQuery();
    }
  }

  render() {
    if(this.props.query.execution) {
      this.props.executeQuery(false);
      this.handleQuery();
    }
    
    if(this.state.dataReceived) {
      return(
        <div>

          <Player 
            onClick={ this.handleChangeCard.bind(this) } 
            activeSong={ this.state.activeSong }  
            songs={ this.state.songs } 
            client_id={ this.state.client_id } 
            onSwipeMove={ this.handleMove.bind(this) }
          />
          
        </div>
      )
    }
    
    else {
      return(
        <div>

        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    query: state.query
  }
}

function matchDispatchToProps(dispatch) {
  let functions = { 
    executeQuery: executeQuery
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);