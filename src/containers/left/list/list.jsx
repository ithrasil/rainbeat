// React
import React, { Component } from 'react';

// React modules
import ScrollArea from "react-scrollbar";

// Containers
import Queue from 'Containers/left/list/queue/queue.jsx';

export default class List extends Component {
	
	render() {
    
    return(
      <ScrollArea className="list" speed={ 1 } smoothScrolling={ true }>
        <Queue />
      </ScrollArea>
    )
		
  }
}