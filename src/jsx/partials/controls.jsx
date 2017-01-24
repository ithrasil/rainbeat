import React from 'react';

import helpers from '../../helpers.jsx';

class Controls extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      stream: this.props.activeSong.stream,
      title: this.props.activeSong.title,
      volume: localStorage.getItem('volume') ? localStorage.getItem('volume') : 0.5,
      isMuted: localStorage.getItem('muted') == "true" ? true : false,
      isMouseDown: false,
      dummyTime: 0
    }
  
  }
  
  componentWillReceiveProps(props) {
    if(props.activeSong.title != this.state.title) {

      this.state = {
        stream: props.activeSong.stream,
        title: props.activeSong.title,
        volume: localStorage.getItem('volume') ? localStorage.getItem('volume') : 0.5,
        isMuted: localStorage.getItem('muted') == "true" ? true : false,
        isMouseDown: false,
        dummyTime: 0
      }

      this.handleCanPlayThrough();
      this.handleTimeUpdate();  
      this.handleReset();

      this.handleSwitch();
    }
    
  }
  
  componentDidMount() {
    this.handleCanPlayThrough();
    this.handleTimeUpdate();  
    
    document.body.addEventListener('keyup', (e) => {
//      const songInput = document.querySelector('#songInput');
//      if(e.keyCode == 32 && document.activeElement != songInput){
//
//          this.handleSwitch();
//      }
    }); 
  }
  
  handleReplay() {
    this.state.stream.currentTime = 0;
  }
  
  handleReset() {
    
    this.state.stream.pause();
  }
  
  handleSwitch() {      
    
    const playSwitchIcon = this.playSwitchIcon;
    
    if(this.state.stream.paused) {
      this.state.stream.play();
      playSwitchIcon.src = playSwitchIcon.src.replace('play', 'pause');
      
    }
    else {
      this.state.stream.pause();
      playSwitchIcon.src = playSwitchIcon.src.replace('pause', 'play');
    }

  }
  
  handleCanPlayThrough() {

    this.state.stream.addEventListener('canplaythrough', () => {
      const stream = this.state.stream;
      
      const duration = helpers.convertSecondsToMs(stream.duration);
      const timeIteration = (this.track.offsetWidth) / stream.duration;
      
      stream.volume = this.state.volume;
      stream.muted = this.state.isMuted;

      this.setState({ duration: duration });
      this.setState({ timeIteration: timeIteration });
    });
    
  }
  
  handleTimeUpdate() {

    this.state.stream.addEventListener('timeupdate', () => {
      if(!this.state.isMouseDown) {
        this.setState({ dummyTime: this.state.stream.currentTime });
      }
    });
  }
  
  handleMouseMove(event) {
    
    if(this.state.isMouseDown) {
      this.moveDot(event);
    }
    
    const mouseX = event.clientX;
    const trackLeftX = this.track.getBoundingClientRect().left;
    const difference = Math.ceil(mouseX - trackLeftX);

    this.intendedTime.style.transform = 'translateX(' + (difference - 10) + 'px)';
    this.intendedTime.textContent = helpers.convertSecondsToMs(Math.floor(difference / this.state.timeIteration));
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
    this.state.isMouseDown = true;
  }
  
  handleMouseUp(event) {
    if(this.state.paused) {
      this.state.stream.play();
      this.setState({ paused: false });
    }
    this.moveDot(event);
    this.state.isMouseDown = false;
  }
  
  moveDot(event) {
    const mouseX = event.clientX;
    const trackLeftX = this.track.getBoundingClientRect().left;
    const difference = Math.ceil(mouseX - trackLeftX);
    
    this.setState({ dummyTime: Math.floor(difference / this.state.timeIteration) });
    
    this.state.stream.currentTime = Math.floor(difference / this.state.timeIteration);
  }

  handleMute(e) {
    const isMuted = !this.state.stream.muted;
    this.state.stream.muted = isMuted;
    this.setState({ isMuted: isMuted });
    localStorage.setItem('muted', isMuted);
  }
  
  handleVolume(event) {
    const volume = event.target.value / 100;
    this.setState({volume: volume});
    this.state.stream.volume = volume;
    localStorage.setItem('volume', volume);
  }
  
  render() {
    
    let volumeIcon;
    
    if(this.state.stream.muted) {
      volumeIcon = "/images/icons/volume-mute.svg"
    }
    else {
      volumeIcon = "/images/icons/volume.svg"
    }

    return(
      
      <div className="container">
        
        <div className="song-status">
          <div className="desc">
            <div className="caption">
              { this.state.title }
            </div>
          </div>
          <div className="config">

            <div className="replay_trigger" onClick={ this.handleReplay.bind(this) }>
              <img src="/images/icons/repeat.svg" />
            </div>

            <div className="play_switch" onClick={ this.handleSwitch.bind(this) }>
              <img src="/images/icons/play.svg" ref={ (playSwitchIcon) => { this.playSwitchIcon = playSwitchIcon; }}/>
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
               
                <div className="track_elapsed" style={{ width: `${ this.state.dummyTime * this.state.timeIteration + 2 }px`}}></div>
                <div className="intended_time" ref={ (intendedTime) => { this.intendedTime = intendedTime; }}></div>
                <div className="dot_position" style={{ transform: `translateX(${ this.state.dummyTime * this.state.timeIteration -5 }px)`}}></div>
              </div>
              
              <div className="current_time">{ helpers.convertSecondsToMs(this.state.stream.currentTime) }</div>
              
            </div>
            
            <div className="volume">
              <img src={ volumeIcon } onClick={ this.handleMute.bind(this) }/>
              <input className="slider" max="100" value={ this.state.volume * 100 } min="0" step="1" type="range" onInput={ this.handleVolume.bind(this) }/>
            </div>
            
          </div>
        </div>
      </div>
    )
  }
}

export default Controls;