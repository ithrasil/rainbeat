// React
import React, {Component} from 'react';

// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// Actions
import {changeState, saveQuery, getData} from 'Actions/search.js';

// Icons
import {loupeIcon} from "Containers/svg.jsx";

class Search extends Component {

    constructor(props) {
        super(props);
    }

    handleOnKeyDown(event) {
        if (event.keyCode === 13) {
            this.props.getData(this.props.query, this.props.filters);
        }
    }

    render() {

        return (
            <div className="search">
                <label htmlFor="trackInput">
                    <div aria-label="loupe for search">
                        {loupeIcon({fill: "white"})}
                    </div>
                </label>
                <input
                    id="trackInput"
                    type="text"
                    className="searchInput"
                    onFocus={() => {
                        this.props.changeState(true);
                        this.props.saveQuery("")
                    }
                    }
                    placeholder="Find something you like"

                    onInput={this.props.saveQuery}
                    onKeyDown={this.handleOnKeyDown.bind(this)}
                    value={this.props.query.value}
                />
            </div>
        )

    }
}

function mapStateToProps(state) {
    return {
        query: state.search.query,
        filters: state.filters
    }
}

function matchDispatchToProps(dispatch) {
    let functions = {
        saveQuery: saveQuery,
        changeState: changeState,
        getData: getData
    };

    return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Search);