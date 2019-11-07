// React
import React, { Component } from 'react'

// Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import { changeCard } from 'Actions/card'

// Containers
import Search from 'Containers/middle/search.jsx'
import Artwork from 'Containers/middle/artwork.jsx'
import Dashboard from 'Containers/middle/dashboard.jsx'
import Tips from 'Containers/middle/tips/tips.jsx'

// Helpers
import { assignCardId } from 'Helpers'

class Middle extends Component {

  constructor (props) {
    super(props)
  }

  handleTrackChange (type, value) {
    let id = 0
    const tracks = this.props.tracks

    if (type === 'end') {
      id = assignCardId('next', tracks, this.props.cardId)
    }
    else {
      id = value
    }

    this.props.changeCard(id)
  }

  render () {
    if (this.props.tracks.length === 0) {
      return (
        <section className="middle">
          <Search/>
          <Tips/>
          <Artwork/>
          <div className="dashboard"></div>
        </section>
      )
    }

    const artwork_url = this.props.tracks[this.props.cardId].big_artwork;
    const track = this.props.tracks[this.props.cardId];

    return (
      <section className="middle">
        <Search/>
        <Tips/>
        <Artwork url={artwork_url} />
        <Dashboard
          track={track}
          stream={this.props.stream}
          trackChange={this.handleTrackChange.bind(this)}>
        </Dashboard>
      </section>
    )
  }
}

function mapStateToProps (state) {
  return {
    cardId: state.card.id,
    tracks: state.queue.list
  }
}

function matchDispatchToProps (dispatch) {
  let functions = {
    changeCard: changeCard
  };

  return bindActionCreators(functions, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Middle)