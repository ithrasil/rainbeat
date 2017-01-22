import './css/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from './html-partials/header.jsx';
import Player from './jsx/player.jsx';
import Search from './jsx/search.jsx';

import helpers from './helpers.jsx';

class App extends React.Component { 
  
  constructor(props) {
    super(props);
    
    this.state = {
      activeSong: [],
      songs: [],
      query: localStorage.getItem('query') || "Styx Master Of Shadows - Main Theme",
      dataReceived: false,
      client_id: "2f98992c40b8edf17423d93bda2e04ab",
    }
  }
  
  componentDidMount() {
    this.handleQuery();
  }
  
  handleQuery() {
    const searchModule = document.querySelector('#search');
    const endpoint = `https://api.soundcloud.com/tracks?client_id=${this.state.client_id}&q=${this.state.query}&limit=20`;
    
    search.classList.remove('slideUp');
    
    if(this.state.dataReceived) {
      this.state.activeSong.stream.pause();
      this.setState({dataReceived: false});
    }
    
    fetch(endpoint)
      .then(blob => blob.json())
      .then(data => {
      
        const index = Math.floor(data.length / 2) - 1;
        let song = data[index];
      
        if(song.artwork_url == null) {
          song.artwork_url = "https://unsplash.it/500";
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
            dataReceived: true
          } 
        );
      
        localStorage.setItem('query', this.state.query)
        
    });
  }
  
  handleChangeCard(e) {
    const dataset = e.target.dataset;
    const actualCard = e.target.parentNode;
    
    const activeCard = document.querySelector('.card.active');
    
    if(activeCard != actualCard) {
      const cardsList = document.querySelectorAll('.card');
      const cardsArr = Array.prototype.slice.call(cardsList, 0); 
      const index = cardsArr.indexOf(actualCard);
      
      activeCard.classList.remove('active');
      actualCard.classList.add('active');
      
      var newStream = this.state.activeSong.stream;
    
      newStream.src = dataset.stream_url + "?client_id=" + this.state.client_id;
      
      const newActiveSong = {
        id: dataset.id,
        artwork_url: dataset.artwork_url,
        stream: newStream,
        title: dataset.title,
        index: index
      }

      this.setState({ activeSong: newActiveSong });
      
    }
  }
  
  handleSearch(e) {
    if(e.target == songInput) {
      this.setState( {query: songInput.value} );
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




  


