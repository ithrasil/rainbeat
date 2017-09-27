// React
import React, { Component } from 'react';

// Containers
import List from 'Containers/left/list/list.jsx';
import Search from 'Containers/left/search.jsx';

class Left extends Component {
	
	render() {
    
    return(
      
      <div className="left">
        <Search />
        <List />
      </div>
    )
		
  }
}

export default Left;