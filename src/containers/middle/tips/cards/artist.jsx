// React
import React, { Component } from 'react';

// Helpers
import { resizeArtwork } from 'Helpers';

// Constants
import { BASE64_ARROW_DOWN } from "Constants/images.js"

export default class Artist extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artist: props.artist
    }

  }

  componentWillReceiveProps(props) {
    this.setState({
      artist: props.artist
    });
  }

  handleClick() {
    if(this.state.isActive) return;
    this.props.onClick(this.props.artist.id, this.props.artist.username);
  }

  render() {

    let name = this.state.artist.username;

    return(
      <div className="card" onClick={ this.handleClick.bind(this) }>
        <div className="add" style={{ backgroundImage: "url(" + BASE64_ARROW_DOWN + ")" }} ></div>

        <div className="label">
          <span title={ name }>{ name }</span>
        </div>
      </div>
    )
  }

}
