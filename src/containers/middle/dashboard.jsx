// React
import React from 'react';

// React modules
import ReactHowler from 'react-howler';
import InputRange from 'react-input-range';

// Helpers
import { convertSecondsToMs, prepareStorage } from 'Helpers';

// Constants
import { CLIENT_ID } from 'Constants/config.js';

// Events
import mouse from './events/mouseEvents.jsx';

import { keyPress } from './events/keyboardEvents.jsx';

// Constants
import { BASE64_REPLAY, BASE64_PAUSE, BASE64_PLAY } from "Constants/images.js";

export default class Dashboard extends React.Component {
  
  constructor(props) {
    super(props);
    
    prepareStorage();
    
    const volume = parseFloat(localStorage.getItem('volume') ? localStorage.getItem('volume') : 0.5);
    const mute = localStorage.getItem('mute') == "true" ? true : false;
    
    this.state = {
      activetrack: props.activetrack,
      playing: true,
      isDownTrack: false,
      isDownVolume: false,
      volume: volume,
      mute: mute,
      progress: 0,
      time: 0
    };
    
  }

  componentWillReceiveProps(props) {
    
    if(props.activetrack.title != this.state.activetrack.title) {
				
      this.setState({
        activetrack: props.activetrack,
        playIcon: "play",
        playing: true,
        time: 0
      });
    }
    
  }
  
  timeUpdate() {

    const sound = this.howler;
    const seek = sound.seek() || this.state.time;
    this.setState({ time: Math.round(seek) });

    if (this.state.playing) {
      requestAnimationFrame(this.timeUpdate.bind(this));
    }
  }
  
  onLoad() {
    const timeIteration = (this.track.offsetWidth) / this.howler.duration();
    this.setState({ timeIteration: timeIteration });
    this.timeUpdate();
  }

  onEnd() {
    this.props.trackChange('end');
  }
  
  reset() {
    this.setState({ time: 0 });
    this.howler.seek(0);
  }
  
  playSwitch() { 
    const playing = !this.state.playing;
    this.setState({ playing: playing });
  }
  
  handleMute() {
    const mute = !this.state.mute;
    this.setState({ mute: mute });
    localStorage.setItem('mute', mute);
  }
  
  handleVolume(volume) { 
    this.setState({ volume: volume });
    localStorage.setItem('volume', volume);
  }
  
  moveDot(event) {
    const mouseX = event.clientX;
    const trackLeftX = this.track.getBoundingClientRect().left;
    const difference = Math.ceil(mouseX - trackLeftX);
    const time = Math.floor(difference / this.state.timeIteration);
    
    this.setState({ time: time });
    
    this.howler.seek(time);
  }
  
  render() {
    const playIcon = this.state.playing ? BASE64_PAUSE : BASE64_PLAY;
    
    const currentTime = convertSecondsToMs(this.state.time) == "NaN:NaN" ? "00:00" : convertSecondsToMs(this.state.time);

    return(
      
      <div className="dashboard" onKeyPress={ keyPress.bind(this) }>
        <ReactHowler
          src={ this.state.activetrack.stream_url + "?client_id=" + CLIENT_ID }
          playing={ this.state.playing }
          ext="mp3"
          html5={ true }
          onEnd={ this.onEnd.bind(this) }
          onLoad={ this.onLoad.bind(this) }
          onPlay={ this.timeUpdate.bind(this) }
          volume={ this.state.volume }
          mute={ this.state.mute }
          
          ref={ (ref) => (this.howler = ref) }
        />
        
        <div className="track-status">
         
          <div className="desc">
            <div className="caption">
              { this.state.activetrack.title }
            </div>
          </div>
          
          <div className="configs">

            <div className="replay_trigger" onClick={ this.reset.bind(this) }>
              <img src={ BASE64_REPLAY } />
            </div>

            <div className="play_switch" onClick={ this.playSwitch.bind(this) }>
              <img src={ playIcon }/>
            </div>
            
            
            <div className="volume_controls">
              <InputRange
                maxValue={ 1 }
                minValue={ 0 }
                step={ 0.01 }
                value={ this.state.volume }
                onChange={ this.handleVolume.bind(this) }
             />
            
            </div>
          </div>

          <div className="track_data">

            <div 
              className="track" 
              onMouseEnter={ mouse.enterTrack.bind(this) }
              onMouseMove={ mouse.moveTrack.bind(this) } 
              onMouseLeave={ mouse.leaveTrack.bind(this) }
              onMouseDown={ mouse.downTrack.bind(this) }
              onMouseUp={ mouse.upTrack.bind(this) }
              ref={(track) => { this.track = track; }} 
            >

              <div className="track_elapsed" style={{ width: `${ this.state.time * this.state.timeIteration + 2 }px`}}></div>
              <div className="dot_position" style={{ transform: `translateX(${ this.state.time * this.state.timeIteration -5 }px)`}}></div>
            </div>

            <div className="time_placeholder">
              <div className="current_time active" ref={ (currentTime) => { this.currentTime = currentTime; }}>{ currentTime }</div>
              <div className="intended_time" ref={ (intendedTime) => { this.intendedTime = intendedTime; }}></div>
            </div>

          </div>
            
        </div>
        
      </div>
    )
  }
}