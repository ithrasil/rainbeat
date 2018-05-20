// React
import React, { Component } from 'react'

// Icons
import PlayIcon from 'Containers/svg/PlayIcon.jsx'

export default class Track extends Component {

  constructor (props) {
    super(props)

    this.state = {
      track: props.track
    }
  }

  componentWillReceiveProps (props) {
    this.setState((state, props) => {
      return {
        track: props.track
      }
    })
  }

  handleClick () {
    if (this.state.isActive) return
    this.props.changeTrack(this.state.track)
  }

  render () {

    let title = this.state.track.name

    return (
      <div className="card">
        <div className="order" onClick={this.handleClick.bind(this)}>
          <div className="status">
            <PlayIcon className={'play'} fill={'white'}/>
          </div>
          <div className="id">{this.props.index + 1}.</div>
        </div>
        <div className="label">
          <span title={title}>{title}</span>
        </div>
      </div>
    )
  }

}