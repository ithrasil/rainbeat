// React
import React, { Component } from 'react'

// Containers
import Queue from 'Containers/left/queue/queue.jsx'

export default class Left extends Component {
  render () {
    return (
      <div className="left">
        <Queue/>
      </div>
    )
  }
}