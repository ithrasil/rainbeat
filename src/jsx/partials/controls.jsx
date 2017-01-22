import React from 'react';

import helpers from '../../helpers.jsx';

class Controls extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      stream: this.props.activeSong.stream,
      title: this.props.activeSong.title,
      volume: localStorage.getItem('volume') ? localStorage.getItem('volume') : 50,
      actualTime: "00:00",
      isMuted: localStorage.getItem('muted') == "true" ? true : false
    }
  
  }
  
  componentWillReceiveProps(props) {
    if(props.activeSong.title != this.state.title) {

      this.state = {
        stream: props.activeSong.stream,
        title: props.activeSong.title
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
      const songInput = document.querySelector('#songInput');
      if(e.keyCode == 32 && document.activeElement != songInput){
          this.handleSwitch();
      }
    }); 
  }
  
  handleReplay() {
    this.state.stream.currentTime = 0;
  }
  
  handleReset() {
    const switchBtn = document.querySelector('#switchBtn');
    const positionDot = document.querySelector('#position');
    
    this.state.stream.pause();
    switchBtn.src = switchBtn.src.replace('pause', 'play');
    positionDot.style.left = -5 + "px";
    switchBtn.classList.remove('playing')
  }
  
  handleSwitch() {
    
    const switchBtn = document.querySelector('#switchBtn');           
    
    if(switchBtn.classList.contains('playing')) {
      this.state.stream.pause();
      switchBtn.src = switchBtn.src.replace('pause', 'play');
    }
    else {
      this.state.stream.play();
      switchBtn.src = switchBtn.src.replace('play', 'pause');
    }
    
    switchBtn.classList.toggle('playing')

  }
  
  handleCanPlayThrough() {

    this.state.stream.addEventListener('canplaythrough', () => {
      const stream = this.state.stream;
      
      const duration = helpers.convertSecondsToMs(stream.duration);
      const timeIteration = (document.querySelector('#progress').offsetWidth) / stream.duration;

      stream.muted = this.state.isMuted;

      this.setState({ duration: duration });
      this.setState({ timeIteration: timeIteration });
    });
    
    this.handleSwitch();
  }
  
  handleTimeUpdate() {
    const positionDot = document.querySelector('#position');
    
    this.state.stream.addEventListener('timeupdate', () => {
      positionDot.style.left = -5 + this.state.stream.currentTime * this.state.timeIteration + "px";
      
      this.setState({ actualTime: helpers.convertSecondsToMs(this.state.stream.currentTime) });
    });
  }
  
  showProgress(e) {
    const progressBar = document.querySelector('#progress');
    const intendedTimeTooltip = document.querySelector("#intendedTime");
    const difference = Math.ceil(e.clientX - progressBar.getBoundingClientRect().left);

    intendedTimeTooltip.style.transform = 'translateX(' + (difference - 10) + 'px)';
    intendedTimeTooltip.textContent = helpers.convertSecondsToMs(Math.floor(difference / this.state.timeIteration));
  }
  
  handleProgressBarClick(e) {
    const progressBar = document.querySelector('#progress');
    const positionDot = document.querySelector('#position');
    
    var difference = Math.ceil(e.clientX - progressBar.getBoundingClientRect().left);
    this.state.stream.currentTime = Math.floor(difference / this.state.timeIteration);
    positionDot.style.left = difference;
  }
  
  handleMute(e) {
    const isMuted = !this.state.stream.muted;
    this.state.stream.muted = isMuted;
    this.setState({ isMuted: isMuted });
    localStorage.setItem('muted', isMuted);
  }
  
  handleVolume(e) {
    const volume = e.target.value;
    this.setState({volume: volume});
    this.state.stream.volume = volume / 100;
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

            <div className="replayBtn">
              <img id="replayBtn" src="/images/icons/repeat.svg" onClick={ this.handleReplay.bind(this) }/>
            </div>

            <div className="switchBtn">
              <img id="switchBtn" src="/images/icons/play.svg" onClick={ this.handleSwitch.bind(this) }/>
            </div>

            <div className="progress-and-duration">
              <div className="progress" id="progress" onMouseMove={ this.showProgress.bind(this) } onClick={ this.handleProgressBarClick.bind(this) }>
                <div className="tooltip" id="intendedTime">
                  
                </div>
                <div className="position" id="position"></div>
              </div>
              <div className="actualTime" id="actualTime">
                { this.state.actualTime }
              </div>
            </div>
            
            <div className="volume">
              <img src={ volumeIcon } onClick={ this.handleMute.bind(this) }/>
              <input className="slider" max="100" value={ this.state.volume } min="0" step="1" type="range" onInput={ this.handleVolume.bind(this) }/>
            </div>
            
          </div>
        </div>
      </div>
    )
  }
}

export default Controls;