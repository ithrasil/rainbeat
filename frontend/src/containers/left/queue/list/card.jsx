// React
import React, { Component } from 'react'

// Helpers
import { normalizeTitle } from 'Helpers'

// Icons 
import SpeakerIcon from 'Containers/svg/SpeakerIcon.jsx'
import PlayIcon from 'Containers/svg/PlayIcon.jsx'
import DotMenuIcon from 'Containers/svg/DotMenuIcon.jsx'
import ExitIcon from 'Containers/svg/ExitIcon.jsx'

export default class Card extends Component {

  constructor (props) {
    super(props)

    this.state = {
      track: props.track,
      isActive: props.isActive ? 'active' : '',
    }

  }

  componentWillReceiveProps (props) {
    this.setState((state) => {
      return {
        track: props.track,
        isActive: props.isActive ? 'active' : ''
      }
    })
  }

  placeholderClick () {
    if (this.state.isActive) return
    this.props.trackChange('click', this.props.id)
  }

  deleteClick () {
    this.props.trackDelete(this.props.id)
  }

  render () {

    const cardClasses = 'card ' + this.state.isActive

    const artist = this.state.track.artist

    let title = normalizeTitle(this.state.track.name)

    return (
      <div className={cardClasses}>
        <div className="order" onClick={this.placeholderClick.bind(this)}>
          <div className="status">
            <SpeakerIcon className={'speaker'} fill={'white'}/>
            <PlayIcon className={'play'} fill={'white'}/>
          </div>
          <div className="id">{this.props.id + 1}.</div>
        </div>
        <div className="left_panel">
          <div className="meta">
            <div className="label">
              <span title={this.state.track.name}>{title}</span>
            </div>
            <div className="artist">{artist}</div>
          </div>
          <div className="controls">
            <div className="delete" onClick={this.deleteClick.bind(this)}>
              Delete
              <ExitIcon className="exit" fill={'white'}/>
            </div>
          </div>
        </div>
        {/*TODO: implement onclick*/}
        <DotMenuIcon fill={'white'} className={'dot_menu'}/>
      </div>
    )
  }

}