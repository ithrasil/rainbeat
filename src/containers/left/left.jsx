// React
import React, {Component} from 'react';

// Containers
import Queue from 'Containers/left/queue/queue.jsx';
import Search from 'Containers/left/search.jsx';

export default class Left extends Component {
    render() {
        return (
            <div className="left">
                <Search/>
                <Queue/>
            </div>
        )
    }
}