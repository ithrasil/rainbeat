import React, {Component} from 'react'

// Redux
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// React modules
import ScrollArea from 'react-scrollbar'

// Containers
import Card from 'Containers/middle/tips/cards/card.jsx'
import CardExtended from 'Containers/middle/tips/cards/cardExtended.jsx'
import CardExtendedLoaded from 'Containers/middle/tips/cards/cardExtendedLoaded.jsx'

// Actions
import {updateQueue} from 'Actions/queue.js'
import {changeCard} from 'Actions/card.js'
import {getArtistTracks, getPlaylistTracks} from 'Actions/search.js'

class Result extends Component {
    constructor(props) {
        super(props)
    }

    changeTrack(track) {
        console.log(this.props.queue)
        let newQueue = this.props.queue.slice()

        newQueue.unshift(track)
        this.props.updateQueue({list: newQueue, title: 'Mixed'})
        this.props.changeCard(0)
    }

    handleArtistClick(artist, index) {
        this.props.getArtistTracks(artist, index, this.props.artists)
    }

    handlePlaylistClick(playlist, index) {
        this.props.getPlaylistTracks(playlist, index, this.props.playlists)
    }

    render() {
        const category = this.props.category;

        return (
            <ScrollArea className={this.props.activeCategory === category.name ? 'result active' : 'result'}> {
                category.version === 'track' ? (
                    this.props.tracks.map((track, key) =>
                        <Card
                            key={key}
                            index={key}
                            track={track}
                            changeTrack={this.changeTrack.bind(this)}
                        />)
                ) : (
                    this.props[category.name].map((data, key) => {
                            if (data.tracks !== undefined) {
                                return (
                                    <CardExtendedLoaded
                                        key={key}
                                        index={key}
                                        data={data}
                                        changeTrack={this.changeTrack.bind(this)}
                                    />)
                            } else {
                                return (
                                    <CardExtended
                                        key={key}
                                        index={key}
                                        data={data}
                                        loadTracks={this[category.action].bind(this)}
                                    />)
                            }
                        }
                    )
                )
            }
            </ScrollArea>)
    }
}

function mapStateToProps(state) {
    return {
        tracks: state.search.tracks,
        albums: state.search.albums,
        artists: state.search.artists,
        playlists: state.search.playlists,
        queue: state.queue.list,
    }
}

function matchDispatchToProps(dispatch) {
    let functions = {
        updateQueue: updateQueue,
        changeCard: changeCard,
        getArtistTracks: getArtistTracks,
        getPlaylistTracks: getPlaylistTracks,
    }

    return bindActionCreators(functions, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Result)

