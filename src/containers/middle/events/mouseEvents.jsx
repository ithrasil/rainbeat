// Helpers
import { convertSecondsToMs } from 'Helpers';

export default {
  enterTrack: function() {
    this.currentTime.classList.remove('active');
    this.intendedTime.classList.add('active');
  },

  moveTrack: function(event) {
    if(this.state.isMouseDown) {
      this.moveDot(event);
    }

    const mouseX = event.clientX;
    const trackLeftX = this.track.getBoundingClientRect().left;
    const difference = Math.ceil(mouseX - trackLeftX);

    this.intendedTime.textContent = convertSecondsToMs(Math.floor(difference / this.state.timeIteration));
  },

  moveVolume: function(event) {
    console.log(2);
  },

  leaveTrack: function() {
    if(this.intendedTime.classList.contains('active')) {
      this.intendedTime.classList.remove('active');
      this.currentTime.classList.add('active');
    }

    if(this.state.isMouseDown == false) return;

    if(this.state.paused) {
      this.state.stream.play();
      this.setState({ paused: false });
    }
    this.moveDot(event);
    this.state.isMouseDown = false;
  },

  leaveVolume: function() {
    console.log(3);
  },

  downTrack: function(event) {
    this.intendedTime.classList.remove('active');
    this.currentTime.classList.add('active');

    if(this.state.playing) {
      this.setState({ playing: false });
    }
    this.moveDot(event);
    this.state.isMouseDown = true;
  },

  downVolume: function(event) {
    console.log(4);
  },


  upTrack: function(event) {
    this.setState({ playing: true });
    this.state.isMouseDown = false;
  },

  upVolume: function(event) {
    console.log(5);
  }
}