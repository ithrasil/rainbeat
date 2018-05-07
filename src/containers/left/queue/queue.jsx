// React
import React, {Component} from 'react';

// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// Containers 
import Error from 'Containers/left/queue/error.jsx';
import Info from 'Containers/left/queue/info.jsx';
import List from 'Containers/left/queue/list/list.jsx';

class Queue extends Component {

    render() {
        if (this.props.tracks.length === 0) {

            return (
                <div className="queue">
                    <Error key="0"/>
                </div>
            )
        }

        return (
            <div className="queue active">
                <List/>
            </div>
        )

    }
}

function mapStateToProps(state) {

    return {
        tracks: state.queue.list,
        title: state.queue.title
    }
}

function matchDispatchToProps(dispatch) {
    let functions = {};

    return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Queue);