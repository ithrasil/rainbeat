// React
import React, { Component } from 'react';

// Helpers
import { resizeArtwork } from 'Helpers';

// Constants
import { BASE64_ARROW_DOWN } from "Constants/images.js"

// Containers
import Track from 'Containers/middle/tips/cards/track.jsx';

export default class Artist extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artist: props.artist,
			tracks: props.tracks || [],
			active: false,
			loaded: false
    }

  }

  componentWillReceiveProps(props) {
		if(this.state.artist.username != props.artist.username) {
			this.setState((state, props) => {
				return {
					artist: props.artist,
					tracks: props.tracks || [],
					loaded: false,
					active: false
				}
    	});
		}
		else {
			this.setState((state, props) => {
				return {
					tracks: props.tracks || []
				}
			});
		}
    
  }

  handleClick() {
    if(this.state.isActive) return;
		
		if(!this.state.loaded) {
			this.props.loadTracks(this.props.artist.id, this.props.index);
			this.setState((state, props) => { 
				return {
					active: !this.state.active, loaded: true 
				}
			})
		}
		
    else {
			this.setState((state, props) => { 
				return {
					active: !this.state.active 
				}
			})					
		}
		
  }

  render() {

    let name = this.state.artist.username;

    return(
      <div className="card_extended">
        <div className="card_contents" onClick={ this.handleClick.bind(this) }>
        	<div className="add" style={{ backgroundImage: "url(" + BASE64_ARROW_DOWN + ")" }} ></div>

					<div className="label">
						<span title={ name }>{ name }</span>
					</div>
        </div>
        
        <div className={`fold ${ this.state.active ? 'active' : ''}`}>
        	{
						this.state.tracks.map((track, index) => {
							return <Track key={ index } id={ index } track={ track } onClick={ this.props.changeTrack }/>
						})

					}
        </div>
        
        
      </div>
    )
  }

}
