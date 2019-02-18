import React, {Component} from 'react'

// Redux
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// Actions
import {updateFilter} from 'Actions/filter.js'

// Containers
import Result from 'Containers/middle/tips/result.jsx'

class Tips extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeCategory: 'tracks'
        }
    }

    filterUpdate(name, api) {
        let newFilters = Object.assign({}, this.props.filters)
        newFilters[name][api] = !newFilters[name][api]
        console.log(newFilters)
        this.props.updateFilter(newFilters)
        this.props.getData(this.props.query, this.props.filters)
    }

    handleCategoryChange(category) {
        this.setState((state, props) => {
            return {activeCategory: category}
        })
    }

    render() {

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
                    <h3>Categories</h3> {
                    categories.map((cat, key) => {
                        return (
                            <div key={key} className={'category ' + (this.state.activeCategory ? 'active' : '')}>

                                <div className="name" onClick={this.handleCategoryChange.bind(this, cat.name)}>
                                    {cat.name}
                                </div>
                                <div className="apis"> {
                                    apis.map((api, key) => (
                                        <div
                                            className={`api ${this.props.filters[cat.name][api] ? 'active' : ''}`}
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
                    <div className="wrapper"> {
                        categories.map((category, key) => {
                            if (this.props.filters[category.name]) {
                                return <Result key={key} category={category} activeCategory={this.state.activeCategory}/>;
                            }
                        })
                    }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        query: state.search.query,
        searchStatus: state.search.status,
        filters: state.filters
    }
}

function matchDispatchToProps(dispatch) {
    let functions = {
        updateFilter: updateFilter,
    }

    return bindActionCreators(functions, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Tips)
