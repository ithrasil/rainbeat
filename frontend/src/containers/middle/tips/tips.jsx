import React, { Component } from 'react'

// React modules
import ScrollArea from 'react-scrollbar'

// Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import { updateQueue } from 'Actions/queue.js'
import { changeCard } from 'Actions/card.js'
import { getData, getArtistTracks, getPlaylistTracks } from 'Actions/search.js'
import { updateFilter } from 'Actions/filter.js'

// Containers
import Card from 'Containers/middle/tips/cards/card.jsx'
import CardExtended from 'Containers/middle/tips/cards/cardExtended.jsx'
import CardExtendedLoaded from 'Containers/middle/tips/cards/cardExtendedLoaded.jsx'

class Tips extends Component {

  constructor (props) {
    super(props)

    this.state = {
      activeCategory: 'tracks'
    }
  }

  changeTrack (track) {
    let newQueue = this.props.queue.slice()

    newQueue.unshift(track)
    this.props.updateQueue({list: newQueue, title: 'Mixed'})
    this.props.changeCard(0)
  }

  handleArtistClick (artist, index) {
    this.props.getArtistTracks(artist, index, this.props.artists)
  }

  handlePlaylistClick (playlist, index) {
    this.props.getPlaylistTracks(playlist, index, this.props.playlists)
  }

  filterUpdate (name, api) {
    let newFilters = Object.assign({}, this.props.filters)
    newFilters[name][api] = !newFilters[name][api]
    console.log(newFilters)
    this.props.updateFilter(newFilters)
    this.props.getData(this.props.query, this.props.filters)
  }

  handleCategoryChange (category) {
    this.setState((state, props) => {
      return {activeCategory: category}
    })
  }

  render () {

    const searchStatus = this.props.searchStatus ? 'active' : ''

    const apis = ['soundcloud', 'jamendo']

    const categories = [
      {name: 'tracks', status: 'tracksActive', version: 'track'},
      {
        name: 'artists',
        action: 'handleArtistClick',
        version: 'extended'
      },
      // {
      //   label: 'Albums',
      //   name: 'albums',
      //   action: 'handleAlbumClick',
      //   version: 'extended'
      // },
      {
        name: 'playlists',
        action: 'handlePlaylistClick',
        version: 'extended'
      }
    ]

    // TODO: REFACTOR THIS !!

    return (
      <div className={'tips ' + searchStatus}>
        <div className="categories">
          <h3>Categories</h3>
          {
            categories.map((cat, key) => {
              return (
                <div key={key} className={'category ' + (this.state.activeCategory === cat.name ? 'active' : '')}>

                  <div className="name" onClick={this.handleCategoryChange.bind(this, cat.name)}>
                    {cat.name}
                  </div>
                  <div className="apis">
                  {
                    apis.map((api, key) => (
                      <div
                        className={`api ${this.props.filters[cat.name][api] === true ? 'active' : ''}`}
                        title={api[0]}
                        style={{backgroundImage: `url(/images/sources/${api}.png)`}}
                        onClick={this.filterUpdate.bind(this, cat.name, api)}
                        key={key}>
                      </div>
                    ))
                  }
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="results">
          <h3>{this.state.activeCategory}</h3>
          <div className="wrapper">
            {
              categories.map((cat, key) => {
                return (
                  <ScrollArea key={key} className={'result ' + (this.state.activeCategory === cat.name ? 'active' : '')}>
                    {
                      cat.version === 'track' ? (
                        this.props.tracks.map((track, index) =>
                          <Card key={index} index={index} track={track} changeTrack={this.changeTrack.bind(this)}/>)
                      ) : (
                        this.props[cat.name].map((data, index) => {
                            if(data.tracks !== undefined) {

                              return <CardExtendedLoaded key={index} index={index} data={data}
                                                   changeTrack={this.changeTrack.bind(this)}/>
                            } else {
                              return <CardExtended key={index} index={index} data={data} loadTracks={this[cat.action].bind(this)}/>
                            }
                          }
                        )
                      )
                    }
                  </ScrollArea>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    query: state.search.query,
    tracks: state.search.tracks,
    albums: state.search.albums,
    artists: state.search.artists,
    playlists: state.search.playlists,
    searchStatus: state.search.status,
    queue: state.queue.list,
    index: state.card.id,
    filters: state.filters
  }
}

function matchDispatchToProps (dispatch) {
  let functions = {
    updateQueue: updateQueue,
    changeCard: changeCard,
    getArtistTracks: getArtistTracks,
    getPlaylistTracks: getPlaylistTracks,
    updateFilter: updateFilter,
    getData: getData
  }

  return bindActionCreators(functions, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Tips)
