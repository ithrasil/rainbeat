import React, {Component} from 'react';

// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// Actions
import {changeState} from 'Actions/search.js';
import {updateFilter} from 'Actions/filter.js';

// Icons
import {exitIcon} from "Containers/svg.jsx"

class Info extends Component {

    render() {
        return (
            <div className="info">
                <div className="close_search label" onClick={() => {
                    this.props.changeState(false)
                }}>
                    {exitIcon({fill: "white"})}
                    <span>Close search</span>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function matchDispatchToProps(dispatch) {
    let functions = {
        changeState: changeState
    };

    return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Info);