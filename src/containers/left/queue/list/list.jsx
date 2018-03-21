import React, {Component} from 'react';

// React modules
import ScrollArea from "react-scrollbar";

// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// Actions
import {changeCard} from 'Actions/card';
import {deleteTrack} from 'Actions/queue';
// Containers 
import Card from 'Containers/left/queue/list/card.jsx';

// Helpers
import {assignCardId} from 'Helpers';

class List extends Component {

    handleDeleteTrack(id) {
        const cardId = this.props.cardId;
        const tracks = this.props.tracks;
        const newTracks = tracks.slice(0, id).concat(tracks.slice(id + 1, tracks.length));

        if (cardId == tracks.length - 1) {
            this.props.changeCard(cardId - 1);
        }

        this.props.deleteTrack(newTracks);
    }

    handleTrackChange(type, value) {
        let id = 0;
        const tracks = this.props.tracks;

        if (type == "end") {
            id = assignCardId('next', tracks, this.props.cardId - 1)
        }
        else {
            id = value;
        }

        this.props.changeCard(id);
    }

    render() {

        return (
            <ScrollArea className="list" speed={1} smoothScrolling={false}>
                {
                    this.props.tracks.map((track, index) => {
                        let isActive = (index == this.props.cardId);

                        return (
                            <Card
                                key={index}
                                id={index}
                                track={track}
                                trackDelete={this.handleDeleteTrack.bind(this)}
                                trackChange={this.handleTrackChange.bind(this)}
                                isActive={isActive}
                            />
                        );
                    })
                }
            </ScrollArea>
        )

    }
}

function mapStateToProps(state) {
    return {
        cardId: state.card.id,
        tracks: state.queue.list
    }
}

function matchDispatchToProps(dispatch) {
    let functions = {
        changeCard: changeCard,
        deleteTrack: deleteTrack
    };

    return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(List);

