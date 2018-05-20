// React
import React, { Component } from 'react'

// Icons
import ArrowIcon from 'Containers/svg/ArrowIcon.jsx'

// Containers
import Track from 'Containers/middle/tips/cards/track.jsx'

export default class Artist extends Component {

  constructor (props) {
    super(props)

    this.state = {
      artist: props.data,
      active: false,
    }
  }

  componentWillReceiveProps (props) {
    if (this.state.artist.name !== props.data.name) {
      this.setState((state, props) => {
        return {
          artist: props.data,
          active: false
        }
      })
    }
    else {
      if (this.state.active) {
        this.setState((state, props) => {
          return {
            tracks: props.tracks || [],
          }
        })
      }
    }
  }

  handleClick () {
    this.setState((state, props) => {
      return {
        active: !this.state.active,
      }
    });
  }

  render () {
    let name = this.state.artist.name;
    const tracks = this.state.artist.tracks;
    const isActive = this.state.active ? ' active' : '';

    return (
      <div className={'card_extended ' + isActive}>
        <div className="card_contents" onClick={this.handleClick.bind(this)}>
          <ArrowIcon className={'arrow'} fill={'white'}/>
          <div className="label">
            <span title={name}>{name}</span>
          </div>
          <div className={'sk-fading-circle ' + this.state.loadClass}>
            <div className="sk-circle1 sk-circle"></div>
            <div className="sk-circle2 sk-circle"></div>
            <div className="sk-circle3 sk-circle"></div>
            <div className="sk-circle4 sk-circle"></div>
            <div className="sk-circle5 sk-circle"></div>
            <div className="sk-circle6 sk-circle"></div>
            <div className="sk-circle7 sk-circle"></div>
            <div className="sk-circle8 sk-circle"></div>
            <div className="sk-circle9 sk-circle"></div>
            <div className="sk-circle10 sk-circle"></div>
            <div className="sk-circle11 sk-circle"></div>
            <div className="sk-circle12 sk-circle"></div>
          </div>
        </div>
        <div className="fold">
          {
            tracks.map((track, index) => <Track key={index} index={index} track={track}
                                                changeTrack={this.props.changeTrack} /> )
          }
        </div>
      </div>
    )
  }

}
