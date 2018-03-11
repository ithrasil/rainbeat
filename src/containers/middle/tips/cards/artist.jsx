// React
import React, { Component } from 'react';

// Icons
import { arrowDownIcon } from "Containers/svg.jsx";

// Containers
import Track from 'Containers/middle/tips/cards/track.jsx';

export default class Artist extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artist: props.data,
			active: false,
			loaded: false
    }

  }

  componentWillReceiveProps(props) {
		if(this.state.artist.name != props.data.name) {
			this.setState((state, props) => {
				return {
					artist: props.data,
					loaded: false,
					active: false
				}
			});
		}
  }

  handleClick() {
    if(this.state.isActive) return;
		
		if(!this.state.loaded) {
			this.props.loadTracks(this.props.data, this.props.index);
			this.setState((state, props) => ({ 
					active: !this.state.active, 
					loaded: true 
				})
			)
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
		const artist = this.state.artist;
		
    let name = artist.name;
		const tracks = artist.tracks || [];

    return(
      <div className="card_extended">
        <div className="card_contents" onClick={ this.handleClick.bind(this) }>
        	{arrowDownIcon({fill: "white"})}
        	<div className="source"  style={{ backgroundImage: `url(/images/sources/${artist.source}.png)` }} ></div>
					<div className="label">
						<span title={ name }>{ name }</span>
					</div>
        </div>
        
        <div className={`fold ${ this.state.active ? 'active' : ''}`}>
        	{
						tracks.map((track, index) => <Track key={ index } id={ index } track={ track } onClick={ this.props.changeTrack }/>)
					}
        </div>
        
        
      </div>
    )
  }

}
