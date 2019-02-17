// React
import React, { Component } from 'react'

// Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import { changeState, fetch} from 'Actions/search'

// Icons
import LoupeIcon from 'Containers/svg/LoupeIcon.jsx'
import ExitIcon from 'Containers/svg/ExitIcon.jsx'

class Search extends Component {

  constructor (props) {
    super(props)

    this.state = { "query": "" };
  }

  handleOnKeyDown (event) {
    if (event.keyCode === 13) {
      this.props.fetch("tracks", this.state.query, this.props.filters.tracks);
      this.props.fetch("artists", this.state.query, this.props.filters.artists);
      this.props.fetch("playlists", this.state.query, this.props.filters.playlists);
    }
  }

  handleInput(event) {
    this.setState({"query": event.target.value})
  }

  render () {

    const searchStatus = this.props.searchStatus ? 'active' : ''

    return (
      <div className={'search ' + searchStatus}>
        <label htmlFor="trackInput">
          <div aria-label="loupe for search">
            <LoupeIcon className={'loupe'} fill={'white'}/>
          </div>
        </label>
        <input
          id="trackInput"
          type="text"
          className="searchInput"
          onFocus={() => { this.props.changeState(true) } }
          placeholder="Find music you like ..."
          onInput={this.handleInput.bind(this)}
          onKeyDown={this.handleOnKeyDown.bind(this)}
          value={this.state.query}
        />
        <ExitIcon className={'exit'} fill={'white'} onClick={() => {
          this.props.changeState(false)
        }}/>
      </div>
    )

  }
}

function mapStateToProps (state) {
  return {
    searchStatus: state.search.status,
    filters: state.filters
  }
}

function matchDispatchToProps (dispatch) {
  let functions = {
    changeState: changeState,
    fetch: fetch
  }

  return bindActionCreators(functions, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Search)