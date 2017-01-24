import './css/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Swipe from 'react-swipe';

import Player from './jsx/player.jsx';
import Search from './jsx/search.jsx';

import helpers from './helpers.jsx';

class App extends React.Component { 
  
  constructor(props) {
    super(props);
    
    this.state = {
      activeSong: [],
      songs: [],
      query: localStorage.getItem('query') || " ",
      dataReceived: false,
      client_id: "2f98992c40b8edf17423d93bda2e04ab",
      songLoaded: true
    }
  }
  
  componentDidMount() {
    this.handleQuery();
  }
  
  handleQuery() {
  
    if(this.state.songLoaded == false) return;
    
    const searchModule = document.querySelector('#search');
    const endpoint = `https://api.soundcloud.com/tracks?client_id=${this.state.client_id}&q=${this.state.query}&limit=40`;
    
    fetch(endpoint)
      .then(blob => blob.json())
      .then(data => {

        if(data.length == 0) return ;
        
        if(this.state.dataReceived) {
          this.state.activeSong.stream.pause();
          this.setState({dataReceived: false});
        }
      
        const index = 0
        let song = data[index];
      
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
            songs: data, 
            dataReceived: true,
            songLoaded: false
          } 
        );
      
        localStorage.setItem('query', this.state.query);
      
        this.state.activeSong.stream.addEventListener('canplay', () => {
          this.state.songLoaded = true
        })
        
        this.state.activeSong.stream.addEventListener('ended', () => {
          this.handleChangeCard('next');
        })
        
    });
  }
  
  handleChangeCard(direction) {
    if(this.state.songLoaded == false) return;
    
    const oldActiveCard = document.querySelector('.card.active');
    const cardsList = document.querySelectorAll('.card');

    let newActiveCard;

    if(typeof direction == "object") {
      newActiveCard = direction.target.parentNode;
    }
    else if(direction == "next"){
      newActiveCard = oldActiveCard.nextSibling;
      
      if(newActiveCard.classList.contains('dummy')){
        newActiveCard = cardsList[2];
      }
    }
    else if(direction == "prev"){
      newActiveCard = oldActiveCard.previousSibling;
      
      if(newActiveCard.classList.contains('dummy')){
        const length = cardsList.length;
        newActiveCard = cardsList[length-3];
      }
    }
    
    const dataset = newActiveCard.children[0].dataset;

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
    console.log(position);
    const direction = position.x > 0 ? "prev" : "next";
    this.handleChangeCard(direction);
  }
  
  handleSearch(e) {
    if(e.target == songInput) {
      this.setState({ query: songInput.value });
      e.target.value = this.state.query;
    }
  }
  
  handleEnter(e) {
    if(e.keyCode == 13) {
      this.handleQuery();
    }
  }
  
  render() {
    
    if(this.state.dataReceived) {
      return(
        <div>
          <Search 
            onClick={ this.handleQuery.bind(this) } 
            onKeyDown ={ this.handleEnter.bind(this) } 
            onInput={this.handleSearch.bind(this)}
            query={ this.state.query }
          />
        
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
        <div >
          <Search 
            onClick={ this.handleQuery.bind(this) } 
            onKeyDown ={ this.handleEnter.bind(this)  }
            onInput={this.handleSearch.bind(this)} 
            query={ this.state.query }
          />
        </div>
      )
    }
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);




  


