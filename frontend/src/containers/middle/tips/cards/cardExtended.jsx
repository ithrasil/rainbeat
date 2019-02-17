// React
import React, { Component } from 'react'

// Icons
import ArrowIcon from 'Containers/svg/ArrowIcon.jsx'

// Components
import LoadIcon from './components/LoadIcon.jsx'

export default class CardExtended extends Component {

  constructor (props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  handleClick () {
    this.setState((props, state) => {
      return {"loading": true}
    });
    this.props.loadTracks(this.props.data, this.props.index)
  }

  render () {
    return (
      <div className='card_extended'>
        <div className="card_contents" onClick={this.handleClick.bind(this)}>
          <ArrowIcon className={'arrow'} fill={'white'}/>
          <div className="source" style={{backgroundImage: `url(/images/sources/${this.props.data.source}.png)`}}></div>
          <div className="label"><span title={this.props.data.name}>{this.props.data.name}</span></div>
          {this.state.loading === true ? <LoadIcon/> : ""}
        </div>

      </div>
    )
  }
}
