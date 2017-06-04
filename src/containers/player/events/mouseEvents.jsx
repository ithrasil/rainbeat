// Helpers
import { convertSecondsToMs } from '../../../helpers.jsx';

const mouseEnter = function() {
  this.currentTime.classList.remove('active');
  this.intendedTime.classList.add('active');
};

const mouseMove = function(event) {
  if(this.state.isMouseDown) {
    this.moveDot(event);
  }

  const mouseX = event.clientX;
  const trackLeftX = this.track.getBoundingClientRect().left;
  const difference = Math.ceil(mouseX - trackLeftX);

  this.intendedTime.textContent = convertSecondsToMs(Math.floor(difference / this.state.timeIteration));
}

const mouseLeave = function() {
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
};

const mouseDown = function(event) {
  this.intendedTime.classList.remove('active');
  this.currentTime.classList.add('active');

  if(this.state.playing) {
    this.setState({ playing: false });
  }
  this.moveDot(event);
  this.state.isMouseDown = true;
};

const mouseUp = function(event) {
  this.setState({ playing: true });
  this.state.isMouseDown = false;
}

export { mouseEnter, mouseMove, mouseLeave, mouseDown, mouseUp };