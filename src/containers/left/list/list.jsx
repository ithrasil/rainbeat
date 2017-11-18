// React
import React, { Component } from 'react';

// Containers
import Queue from 'Containers/left/list/queue/queue.jsx';

class List extends Component {
	
	render() {
    
    return(
      <div className="list">
        <Queue />
      </div>
    )
		
  }
}

export default List;