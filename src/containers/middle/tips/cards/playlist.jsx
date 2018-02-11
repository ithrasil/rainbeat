// React
import React, { Component } from 'react';

// Icons
import { arrowDownIcon } from "Containers/svg.jsx";

// Containers
import Track from 'Containers/middle/tips/cards/track.jsx';

export default class Playlist extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playlist: props.data,
			active: false,
			loaded: false
    }

  }

  componentWillReceiveProps(props) {
		if(this.state.playlist.title != props.data.title) {
			this.setState((state, props) => {
				return {
					playlist: props.data,
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
			this.props.loadTracks(this.props.data.id, this.props.index);
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

    let name = this.state.playlist.title;
		const tracks = this.state.playlist.tracks || [];

    return(
      <div className="card_extended">
        <div className="card_contents" onClick={ this.handleClick.bind(this) }>
        	{arrowDownIcon({fill: "white"})}

					<div className="label">
						<span title={ name }>{ name }</span>
					</div>
        </div>
        
        <div className={`fold ${ this.state.active ? 'active' : ''}`}>
        	{
						tracks.map((track, index) => {
							return <Track key={ index } id={ index } track={ track } onClick={ this.props.changeTrack }/>
						})

					}
        </div>
        
        
      </div>
    )
  }

}
