import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { convertSecondsToMs } from '../../helpers.jsx';

class Controls extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.prepareStorage();
    
    this.state = {
      stream: props.stream,
      activeSong: props.activeSong,
      isMouseDown: false,
      volumeIcon: localStorage.getItem('isMuted') ? "volume-mute" : "volume",
      playIcon: "play",
      volume: localStorage.getItem('volume'),
      time: 0
    }
  
  }
  
  prepareStorage() {
    if(localStorage.getItem('isMuted') == null) {
      localStorage.setItem('isMuted', "false");
    }
    if(localStorage.getItem('volume') == null) {
      localStorage.setItem('volume', "0.5");
    }
  }
  
  componentWillReceiveProps(props) {

    if(props.activeSong.title != this.state.activeSong.title) {
      this.setState({
        stream: props.stream,
        activeSong: props.activeSong,
        playIcon: "play",
        time: 0
      });
      
      this.prepareAudio();
    }
  }
  
  componentDidMount() {
    this.prepareAudio();
  }
  
  handlePlaySwitch() {      

    if(this.state.stream.paused) {
      this.state.stream.play();
      this.setState({ playIcon: "pause" })
      
    }
    else {
      this.state.stream.pause();
      this.setState({ playIcon: "play" })
    }

  }
  
  prepareAudio() {
    
    const stream = this.state.stream;

    stream.addEventListener('canplaythrough', () => {
      
      const duration = convertSecondsToMs(stream.duration);
      const timeIteration = (this.track.offsetWidth) / stream.duration;
  
      stream.volume = this.state.volume;
      stream.muted = this.state.isMuted;
      
      this.setState({ duration: duration });
      this.setState({ timeIteration: timeIteration });
    });
    
    
    this.state.stream.addEventListener('timeupdate', () => {
      if(!this.state.isMouseDown) {
        this.setState({ time: this.state.stream.currentTime });
      }
    });
  }
  
  handleKeyPress() {
    const songInput = document.querySelector('#songInput');
    
    if(event.keyCode == 32 && document.activeElement != songInput){
      this.handlePlaySwitch();
    }
  }
  
  handleMouseMove(event) {
    
    if(this.state.isMouseDown) {
      this.moveDot(event);
    }
    
    const mouseX = event.clientX;
    const trackLeftX = this.track.getBoundingClientRect().left;
    const difference = Math.ceil(mouseX - trackLeftX);

    this.intendedTime.style.transform = 'translateX(' + (difference - 10) + 'px)';
    this.intendedTime.textContent = convertSecondsToMs(Math.floor(difference / this.state.timeIteration));
  }
  
  handleMouseLeave() {
    if(this.state.isMouseDown == false) return;
    
    if(this.state.paused) {
      this.state.stream.play();
      this.setState({ paused: false });
    }
    this.moveDot(event);
    this.state.isMouseDown = false;
  }

  handleMouseDown(event) {
    
    if(!this.state.stream.paused) {
      this.state.stream.pause();
      this.setState({ paused: true });
    }
    this.moveDot(event);
    this.state.isMouseDown = true;
  }
  
  handleMouseUp(event) {
    if(this.state.paused) {
      this.state.stream.play();
      this.setState({ paused: false });
    }
    this.state.isMouseDown = false;
  }
  
  moveDot(event) {
    const mouseX = event.clientX;
    const trackLeftX = this.track.getBoundingClientRect().left;
    const difference = Math.ceil(mouseX - trackLeftX);
    const time = Math.floor(difference / this.state.timeIteration);
    
    this.setState({ time: time });
    
    this.state.stream.currentTime = time;
  }

  handleMute(e) {
    const isMuted = !this.state.stream.muted;
    this.state.stream.muted = isMuted;
    this.setState({ isMuted: isMuted });
    
    localStorage.getItem('isMuted', isMuted)
  }
  
  handleVolume(event) { 
    const volume = event.target.value / 100;
    this.state.stream.volume = volume;
    this.setState({ volume: volume });
    localStorage.setItem('volume', volume);
  }
  
  render() {
    return(
      
      <div tabIndex="0" className="controls" onKeyPress={ this.handleKeyPress.bind(this) }>
        
        <div className="song-status">
          <div className="desc">
            <div className="caption">
              { this.state.activeSong.title }
            </div>
          </div>
          <div className="configs">

            <div className="replay_trigger" onClick={ () => this.state.stream.currentTime = 0 }>
              <img src="/images/icons/repeat.svg" />
            </div>

            <div className="play_switch" onClick={ this.handlePlaySwitch.bind(this) }>
              <img src={ `/images/icons/${ this.state.playIcon }.svg` }/>
            </div>

            <div className="track_controls">
             
              <div 
                className="track" 
                onMouseMove={ this.handleMouseMove.bind(this) } 
                onMouseLeave={ this.handleMouseLeave.bind(this) }
                onMouseDown={ this.handleMouseDown.bind(this) }
                onMouseUp={ this.handleMouseUp.bind(this) }
                ref={(track) => { this.track = track; }} 
              >
               
                <div className="track_elapsed" style={{ width: `${ this.state.time * this.state.timeIteration + 2 }px`}}></div>
                <div className="intended_time" ref={ (intendedTime) => { this.intendedTime = intendedTime; }}></div>
                <div className="dot_position" style={{ transform: `translateX(${ this.state.time * this.state.timeIteration -5 }px)`}}></div>
              </div>
              
              <div className="current_time">{ convertSecondsToMs(this.state.stream.currentTime) }</div>
              
            </div>
            
            <div className="volume_controls">
              <img src={ `/images/icons/${this.state.volumeIcon}.svg` } onClick={ this.handleMute.bind(this) }/>
              <input className="slider" max="100" value={ this.state.volume * 100 } min="0" step="1" type="range" onInput={ this.handleVolume.bind(this) }/>
            </div>
            
          </div>
        </div>
      </div>
    )
  }
}

export default Controls;