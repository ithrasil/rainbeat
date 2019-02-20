// React
import React from 'react'

// React modules
import ReactHowler from 'react-howler'
import InputRange from 'react-input-range'

// Helpers
import {convertSecondsToMinutes, prepareStorage} from 'Helpers'

// Icons
import PlayIcon from 'Containers/svg/PlayIcon.jsx'
import PauseIcon from 'Containers/svg/PauseIcon.jsx'
import RewindIcon from 'Containers/svg/RewindIcon.jsx'

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        prepareStorage();

        const volume = parseFloat(localStorage.getItem('volume') ? localStorage.getItem('volume') : 0.5);
        const mute = localStorage.getItem('mute') === 'true';

        this.state = {
            track: props.track,
            playing: false,
            isDownTrack: false,
            isDownVolume: false,
            volume: volume,
            mute: mute,
            progress: 0,
            time: 0,
            intendedTime: false,
            timeIteration: false,
        }
    }

    componentWillReceiveProps(props) {
        if (props.track.stream === this.state.track.stream) return;
        this.setState((state, props) => ({
            track: props.track,
            playing: true,
            time: 0,
        }))
    }

    setTimeIteration(event) {
        const timeIteration = (this.track.offsetWidth) / this.howler.duration();
        if (timeIteration === this.state.timeIteration) {
            return;
        }
        this.setState((state, props) => ({timeIteration: timeIteration}));
        this.timeUpdate()
    }

    timeUpdate() {
        const sound = this.howler;
        const seek = sound.seek() || this.state.time;
        this.setState((state, props) => ({stream: "", time: Math.round(seek)}));
        if (this.state.playing) {
            requestAnimationFrame(this.timeUpdate.bind(this))
        }
    }

    finishTrack() {
        this.props.trackChange('end')
    }

    reset() {
        this.setState((state, props) => ({time: 0}));
        this.howler.seek(0)
    }

    playSwitch() {
        this.setState((state, props) => ({playing: !this.state.playing}));
    }

    handleMute() {
        const mute = !this.state.mute;
        this.setState((state, props) => ({mute: mute}));
        localStorage.setItem('mute', mute.toString())
    }

    handleVolume(volume) {
        this.setState((state, props) => ({volume: volume}));
        localStorage.setItem('volume', volume)
    }

    moveDot(event) {
        const mouseX = event.clientX;
        const trackLeftX = this.track.getBoundingClientRect().left;
        const difference = Math.ceil(mouseX - trackLeftX);
        let intendedTime = Math.floor(difference / this.state.timeIteration);

        if (intendedTime < 0) {
            intendedTime = 0;
        } else if (intendedTime > this.howler.duration()) {
            intendedTime = this.howler.duration();
        }
        this.setState((state, props) => ({intendedTime: intendedTime}));
    }

    enterTrack() {
        this.currentTime.classList.remove('active');
        this.intendedTime.classList.add('active');
    }

    leaveTrack() {
        if (this.intendedTime.classList.contains('active')) {
            this.intendedTime.classList.remove('active');
            this.currentTime.classList.add('active');
            this.setState((state, props) => ({intendedTime: false}));
        }

        if (!this.state.isMouseDown) return;

        if (this.state.paused) {
            this.state.stream.play();
            this.setState((state, props) => ({paused: false}))
        }
        this.setState((state, props) => ({isMouseDown: false}))
    }

    downTrack(event) {
        this.setState((state, props) => ({playing: false}));
        this.state.isMouseDown = true
    }

    upTrack() {
        this.howler.seek(this.state.intendedTime);
        this.setState((state, props) => ({playing: true}));
        this.state.isMouseDown = false
    }

    render() {
        const currentTime = convertSecondsToMinutes(this.state.time);
        let intendedTime = convertSecondsToMinutes(this.state.intendedTime);
        let dotPlacement;
        if (!this.state.intendedTime) {
            dotPlacement = this.state.time * this.state.timeIteration;
        } else {
            dotPlacement = this.state.intendedTime * this.state.timeIteration - 5;
        }

        return (
            <div className="dashboard">
                <ReactHowler
                    src={this.state.track.stream}
                    playing={this.state.playing}
                    ext="mp3"
                    html5={true}
                    onEnd={this.finishTrack.bind(this)}
                    onLoad={this.setTimeIteration.bind(this)}
                    onPlay={this.timeUpdate.bind(this)}
                    volume={this.state.volume}
                    mute={this.state.mute}
                    ref={(ref) => (this.howler = ref)}
                />)
                <div className="track-status">
                    <div className="desc">
                        <div className="caption">
                            {this.state.track.name}
                        </div>
                    </div>

                    <div className="configs">
                        <div className="replay_trigger" onClick={this.reset.bind(this)}>
                            <RewindIcon className={'rewind'} fill={'white'}/>
                        </div>

                        <div className="play_switch" onClick={this.playSwitch.bind(this)}>
                            {this.state.playing ?
                                <PauseIcon className={'pause'} fill={'white'}/> :
                                <PlayIcon className={'play'} fill={'white'}/>
                            }
                        </div>

                        <div className="volume_controls">
                            <InputRange
                                maxValue={1}
                                minValue={0}
                                step={0.01}
                                value={this.state.volume}
                                onChange={this.handleVolume.bind(this)}
                            />
                        </div>
                    </div>

                    <div className="track_data">
                        <div
                            className="track"
                            onMouseEnter={this.enterTrack.bind(this)}
                            onMouseMove={this.moveDot.bind(this)}
                            onMouseLeave={this.leaveTrack.bind(this)}
                            onMouseDown={this.downTrack.bind(this)}
                            onMouseUp={this.upTrack.bind(this)}
                            ref={(track) => {
                                this.track = track
                            }}
                        >

                            <div className="track_elapsed"
                                 style={{width: `${this.state.time * this.state.timeIteration + 2}px`}}></div>
                            <div className="dot_position"
                                 style={{transform: `translateX(${dotPlacement}px)`}}></div>
                        </div>

                        <div className="time_placeholder">
                            <div className="current_time active" ref={(currentTime) => {
                                this.currentTime = currentTime
                            }}>
                                {currentTime}
                            </div>
                            <div className="intended_time" ref={(intendedTime) => {
                                this.intendedTime = intendedTime
                            }}>
                                {intendedTime}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
