import React from 'react';

import { convertSecondsToMs, prepareStorage } from '../../helpers.jsx';

class Controls extends React.Component {
  
  constructor(props) {
    super(props);
    
    prepareStorage();
    
    this.state = {
      stream: props.stream,
      activeSong: props.activeSong,
      isMouseDown: false,
      playIcon: "play",
      volume: localStorage.getItem('volume') ? localStorage.getItem('volume') : 0.5,
      muted: localStorage.getItem('muted') == "true" ? true : false,
      time: 0
    }
    
  }
  
  componentDidMount() {
    this.prepareAudio();
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
    
    const state = this.state;

    state.stream.addEventListener('canplaythrough', () => {
      
      const duration = convertSecondsToMs(state.stream.duration);
      const timeIteration = (this.track.offsetWidth) / state.stream.duration;
      
      state.stream.volume = state.volume;
      state.stream.muted = state.muted;
      
      this.setState({ timeIteration: timeIteration });
    });
    
    
    state.stream.addEventListener('timeupdate', () => {
      if(!state.isMouseDown) {
        this.setState({ time: state.stream.currentTime });
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

    this.intendedTime.textContent = convertSecondsToMs(Math.floor(difference / this.state.timeIteration));
  }
  
  handleMouseLeave() {

    this.intendedTime.classList.remove('active');
    this.currentTime.classList.add('active');
    
    if(this.state.isMouseDown == false) return;
    
    if(this.state.paused) {
      this.state.stream.play();
      this.setState({ paused: false });
    }
    this.moveDot(event);
    this.state.isMouseDown = false;
  }
  
  handleMouseEnter() {

    this.currentTime.classList.remove('active');
    this.intendedTime.classList.add('active');
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

  handleMute() {
    const muted = !this.state.stream.muted;
    
    this.state.stream.muted = muted;
    this.setState({ muted: muted });
    localStorage.setItem('muted', muted);
  }
  
  handleVolume(event) { 
    const volume = event.target.value / 100;
    
    this.setState({ volume: volume });
    this.state.stream.volume = volume;
    
    localStorage.setItem('volume', volume);
  }
  
  render() {

    const volumeIcon = this.state.muted ? "volume-mute" : "volume";
 
    return(
      
      <div className="controls" onKeyPress={ this.handleKeyPress.bind(this) }>
        
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
            
          
            
            <div className="volume_controls">
              <img src={ `/images/icons/${volumeIcon}.svg` } onClick={ this.handleMute.bind(this) }/>
              <input className="slider" max="100" defaultValue={ this.state.volume * 100 } min="0" step="1" type="range" onInput={ this.handleVolume.bind(this) }/>
            </div>
          </div>

          <div className="track_data">

            <div 
              className="track" 
              
              onMouseLeave={ this.handleMouseLeave.bind(this) }
              onMouseEnter={ this.handleMouseEnter.bind(this) }
              
              onMouseMove={ this.handleMouseMove.bind(this) } 
              onMouseDown={ this.handleMouseDown.bind(this) }
              onMouseUp={ this.handleMouseUp.bind(this) }
              ref={(track) => { this.track = track; }} 
            >

              <div className="track_elapsed" style={{ width: `${ this.state.time * this.state.timeIteration + 2 }px`}}></div>
              <div className="dot_position" style={{ transform: `translateX(${ this.state.time * this.state.timeIteration -5 }px)`}}></div>
            </div>

            <div className="time_placeholder">
              <div className="current_time active" ref={ (currentTime) => { this.currentTime = currentTime; }}>{ convertSecondsToMs(this.state.stream.currentTime) }</div>
              <div className="intended_time" ref={ (intendedTime) => { this.intendedTime = intendedTime; }}></div>
            </div>

          </div>
            
        </div>
        
      </div>
    )
  }
}

export default Controls;