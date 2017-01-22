import React from 'react';

class Search extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      query: props.query
    };
  }
  
  componentDidMount() {
    document.querySelector('#songInput').focus();
  }
  
  componentWillReceiveProps(props) {
    this.state = {
      query: props.query
    }
  }
  
  toggleSearch() {
    const searchModule = document.querySelector('#search'); 
    searchModule.classList.toggle('slideUp');  
    
    if(searchModule.classList.contains('slideUp')) {
      searchModule.querySelector('#songInput').focus();
    }
    else {
      searchModule.querySelector('#songInput').blur();
    }
  }
  
  render() {
    return(
      <div className="searchModule slideUp" id="search" onKeyDown={ this.props.onKeyDown } >

        <label onClick={ this.toggleSearch.bind(this) } for="songInput"> <img src="/images/icons/search.svg" /></label>

        <input type="text" className="searchInput" id="songInput"  value={ this.state.query } onInput={this.props.onInput} name="songInput"/>

        <button id="searchBtn" onClick={this.props.onClick}>Wyszukaj</button>

      </div>
    )
  }
}

export default Search;