import React, {Component} from 'react';

// React modules
import ScrollArea from "react-scrollbar";

// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// Actions
import {updateQueue} from 'Actions/queue.js';
import {changeCard} from 'Actions/card.js';
import {getData, getArtistTracks, getPlaylistTracks} from 'Actions/search.js';
import {updateFilter} from 'Actions/filter.js';

// Containers
import Track from 'Containers/middle/tips/cards/track.jsx';
import Artist from 'Containers/middle/tips/cards/artist.jsx';
import Playlist from 'Containers/middle/tips/cards/playlist.jsx';
import Empty from 'Containers/middle/tips/cards/empty.jsx';
import Error from 'Containers/middle/tips/error.jsx';
import Info from 'Containers/middle/tips/info.jsx';

// Icons
import ArrowIcon from "Containers/svg/ArrowIcon.jsx";

// Helpers
import {assignCardId} from 'Helpers';

class Tips extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tracksActive: true,
            artistsActive: true,
            albumsActive: false,
            playlistsActive: true
        }
    }

    changeTrack(track) {
        let newQueue = this.props.queue.slice();

        newQueue.unshift(track);
        this.props.updateQueue({list: newQueue, title: "Mixed"});
        this.props.changeCard(0);
    }

    handleArtistClick(artist, index) {
        this.props.getArtistTracks(artist, index, this.props.artists);
    }

    handlePlaylistClick(playlist, index) {
        this.props.getPlaylistTracks(playlist, index, this.props.playlists);
    }

    filterUpdate(name, api) {
        let newFilters = Object.assign({}, this.props.filters);
        newFilters[name][api] = !newFilters[name][api];
        console.log(newFilters);
        this.props.updateFilter(newFilters);
        this.props.getData(this.props.query, this.props.filters);
    }

    render() {

        const searchStatus = this.props.searchStatus ? "active" : "";

        const apis = [["SoundCloud", "soundcloud"], ["Jamendo", "jamendo"]];

        const categories = [
            {label: "Tracks", name: "tracks", status: "tracksActive", version: "track"},
            {
                label: "Artists",
                name: "artists",
                status: "artistsActive",
                component: Artist,
                action: "handleArtistClick",
                version: "extended"
            },
            {
                label: "Albums",
                name: "albums",
                status: "albumsActive",
                component: {},
                action: "handleAlbumClick",
                version: "extended"
            },
            {
                label: "Playlists",
                name: "playlists",
                status: "playlistsActive",
                component: Playlist,
                action: "handlePlaylistClick",
                version: "extended"
            }
        ];

        return (
            <ScrollArea className={"tips " + searchStatus} speed={1} smoothScrolling={false}>
                <Info/>
                {
                    categories.map((cat, key) => {

                        let Component = cat.component;

                        return (

                            <div key={key} className={"categoryWrapper " + (this.state[cat.status] ? "active" : "")}>
                                <div className="category">

                                    <div className="label"
                                         onClick={() => this.setState({[cat.status]: !this.state[cat.status]})}>
                                            <ArrowIcon className={"arrow"} fill={"white"}/>

                                        <div className="text">{cat.label}</div>
                                    </div>

                                    {
                                        apis.map((api, key) => (
                                            <div
                                                className={`api ${this.props.filters[cat.name][api[1]] === true ? "active" : ""}`}
                                                title={api[0]}
                                                style={{backgroundImage: `url(/images/sources/${api[1]}.png)`}}
                                                onClick={this.filterUpdate.bind(this, cat.name, api[1])}
                                                key={key}>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="results">
                                    {

                                        cat.version === "track" ? (
                                                this.props.tracks.map((track, index) =>
                                                    <Track key={index} id={index}
                                                           track={track}
                                                           onClick={this.changeTrack.bind(this)}/>)
                                            )
                                            : (
                                                this.props[cat.name].map((data, index) => {
                                                        if (data.isEmpty === true) {
                                                            return <Empty key={index}/>
                                                        }
                                                        else {
                                                            return (
                                                                <Component key={index} index={index} data={data}
                                                                           tracks={data.tracks}
                                                                           loadTracks={this[cat.action].bind(this)}
                                                                           changeTrack={this.changeTrack.bind(this)}/>)
                                                        }
                                                    }
                                                )
                                            )
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </ScrollArea>
        )
    }
}

function mapStateToProps(state) {
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

function matchDispatchToProps(dispatch) {
    let functions = {
        updateQueue: updateQueue,
        changeCard: changeCard,
        getArtistTracks: getArtistTracks,
        getPlaylistTracks: getPlaylistTracks,
        updateFilter: updateFilter,
        getData: getData
    };

    return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Tips);
