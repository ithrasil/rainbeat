// React
import React, { Component } from 'react'

// Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import { changeState, saveQuery, getData } from 'Actions/search'

// Icons
import LoupeIcon from 'Containers/svg/LoupeIcon.jsx'
import ExitIcon from 'Containers/svg/ExitIcon.jsx'

class Search extends Component {

  constructor (props) {
    super(props)
  }

  handleOnKeyDown (event) {
    if (event.keyCode === 13) {
      this.props.getData(this.props.query, this.props.filters)
    }
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
          placeholder="Find something you like"

          onInput={this.props.saveQuery}
          onKeyDown={this.handleOnKeyDown.bind(this)}
          value={this.props.query.value}
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
    query: state.search.query,
    searchStatus: state.search.status,
    filters: state.filters
  }
}

function matchDispatchToProps (dispatch) {
  let functions = {
    saveQuery: saveQuery,
    changeState: changeState,
    getData: getData
  }

  return bindActionCreators(functions, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Search)