import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateVolume, changeMuted } from '../../actions/controls.jsx';

import helpers from '../../helpers.jsx';

class Controls extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      isMouseDown: false,
      dummyTime: 0
    }
  
  }
  
  componentWillReceiveProps(props) {

    if(props.activeSong.title != this.state.title) {

      this.setState({
        dummyTime: 0
      });

      this.prepareAudio();
    }
  }
  
  componentDidMount() {
    this.prepareAudio();
  }
  
  handlePlaySwitch() {      
    
    const playSwitchIcon = this.playSwitchIcon;
    
    if(this.props.stream.paused) {
      console.log(this.props.stream);
      this.props.stream.play();
      playSwitchIcon.src = playSwitchIcon.src.replace('play', 'pause');
      
    }
    else {
      this.props.stream.pause();
      playSwitchIcon.src = playSwitchIcon.src.replace('pause', 'play');
    }

  }
  
  prepareAudio() {

    this.props.stream.addEventListener('canplaythrough', () => {
      const stream = this.props.stream;
      
      const duration = helpers.convertSecondsToMs(stream.duration);
      const timeIteration = (this.track.offsetWidth) / stream.duration;
      
  
      
      stream.volume = this.props.volume;
      stream.muted = this.props.isMuted;

      this.setState({ duration: duration });
      this.setState({ timeIteration: timeIteration });
    });
    
    this.props.stream.addEventListener('timeupdate', () => {
      if(!this.state.isMouseDown) {
        this.setState({ dummyTime: this.props.stream.currentTime });
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
    this.intendedTime.textContent = helpers.convertSecondsToMs(Math.floor(difference / this.state.timeIteration));
  }
  
  handleMouseLeave() {
    if(this.state.isMouseDown == false) return;
    
    if(this.state.paused) {
      this.props.stream.play();
      this.setState({ paused: false });
    }
    this.moveDot(event);
    this.state.isMouseDown = false;
  }

  handleMouseDown(event) {
    
    if(!this.props.stream.paused) {
      this.props.stream.pause();
      this.setState({ paused: true });
    }
    this.moveDot(event);
    this.state.isMouseDown = true;
  }
  
  handleMouseUp(event) {
    if(this.state.paused) {
      this.props.stream.play();
      this.setState({ paused: false });
    }
    this.state.isMouseDown = false;
  }
  
  moveDot(event) {
    const mouseX = event.clientX;
    const trackLeftX = this.track.getBoundingClientRect().left;
    const difference = Math.ceil(mouseX - trackLeftX);
    const dummyTime = Math.floor(difference / this.state.timeIteration);
    
    this.setState({ dummyTime: dummyTime });
    
    this.props.stream.currentTime = dummyTime;
  }

  handleMute(e) {
    const isMuted = !this.props.stream.muted;
    this.props.changeMuted(isMuted);
    this.props.stream.muted = isMuted;
  }
  
  handleVolume(event) { 
    const volume = event.target.value / 100;
    this.props.updateVolume(volume);
    this.props.stream.volume = volume;
    localStorage.setItem('volume', volume);
  }
  
  render() {
    
    let volumeIcon;
    
    if(this.props.isMuted) {
      volumeIcon = "/images/icons/volume-mute.svg"
    }
    else {
      volumeIcon = "/images/icons/volume.svg"
    }

    return(
      
      <div tabIndex="0" className="controls" onKeyPress={ this.handleKeyPress.bind(this) }>
        
        <div className="song-status">
          <div className="desc">
            <div className="caption">
              { this.props.activeSong.title }
            </div>
          </div>
          <div className="configs">

            <div className="replay_trigger" onClick={ () => this.props.stream.currentTime = 0 }>
              <img src="/images/icons/repeat.svg" />
            </div>

            <div className="play_switch" onClick={ this.handlePlaySwitch.bind(this) }>
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
              
              <div className="current_time">{ helpers.convertSecondsToMs(this.props.stream.currentTime) }</div>
              
            </div>
            
            <div className="volume_controls">
              <img src={ volumeIcon } onClick={ this.handleMute.bind(this) }/>
              <input className="slider" max="100" value={ this.props.volume * 100 } min="0" step="1" type="range" onInput={ this.handleVolume.bind(this) }/>
            </div>
            
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeSong: state.songs.activeSong,
    isMuted: state.config.isMuted,
    volume: state.config.volume,
    stream: state.stream.stream,
    activeSong: state.songs.songs[state.card.id]
  }
}

function matchDispatchToProps(dispatch) {
  let functions = {
    updateVolume: updateVolume,
    changeMuted: changeMuted
  };
  
  return bindActionCreators(functions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Controls);