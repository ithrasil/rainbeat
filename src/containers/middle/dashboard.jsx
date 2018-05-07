// React
import React from 'react';

// React modules
import ReactHowler from 'react-howler';
import InputRange from 'react-input-range';

// Helpers
import {convertSecondsToMs, prepareStorage} from 'Helpers';

// Constants
import {SOUNDCLOUD_ID} from 'Constants/config.js';

// Events
import mouse from './events/mouseEvents.jsx';

import {keyPress} from './events/keyboardEvents.jsx';

// Icons
import PlayIcon from "Containers/svg/PlayIcon.jsx";
import PauseIcon from "Containers/svg/PauseIcon.jsx";
import RewindIcon from "Containers/svg/RewindIcon.jsx";

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        prepareStorage();

        const volume = parseFloat(localStorage.getItem('volume') ? localStorage.getItem('volume') : 0.5);
        const mute = localStorage.getItem('mute') === "true";

        this.state = {
            track: props.track,
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

        if (props.track.name !== this.state.track.name) {
            this.setState((state, props) => {
                return {
                    track: props.track,
                    playing: true,
                    time: 0
                }
            });
        }

    }

    timeUpdate() {
        const sound = this.howler;
        const seek = sound.seek() || this.state.time;

        this.setState((state, props) => {
            return {
                time: Math.round(seek)
            }
        });

        if (this.state.playing) {
            requestAnimationFrame(this.timeUpdate.bind(this));
        }
    }

    onLoad() {
        const timeIteration = (this.track.offsetWidth) / this.howler.duration();

        this.setState((state, props) => {
            return {
                timeIteration: timeIteration
            }
        });

        this.timeUpdate();
    }

    onEnd() {
        this.props.trackChange('end');
    }

    reset() {

        this.setState((state, props) => {
            return {
                time: 0
            }
        });

        this.howler.seek(0);
    }

    playSwitch() {
        this.setState((state, props) => {
            return {
                playing: !this.state.playing
            }
        });
    }

    handleMute() {
        const mute = !this.state.mute;
        this.setState((state, props) => {
            return {
                mute: mute
            }
        });
        localStorage.setItem('mute', mute.toString());
    }

    handleVolume(volume) {
        this.setState((state, props) => {
            return {
                volume: volume
            }
        });
        localStorage.setItem('volume', volume);
    }

    moveDot(event) {
        const mouseX = event.clientX;
        const trackLeftX = this.track.getBoundingClientRect().left;
        const difference = Math.ceil(mouseX - trackLeftX);
        const time = Math.floor(difference / this.state.timeIteration);

        this.setState((state, props) => {
            return {
                time: time
            }
        });

        this.howler.seek(time);
    }

    render() {

        const currentTime = convertSecondsToMs(this.state.time) === "NaN:NaN" ? "00:00" : convertSecondsToMs(this.state.time);

        return (

            <div className="dashboard" onKeyPress={keyPress.bind(this)}>
                <ReactHowler
                    src={this.state.track.stream_url + "?client_id=" + SOUNDCLOUD_ID}
                    playing={this.state.playing}
                    ext="mp3"
                    html5={true}
                    onEnd={this.onEnd.bind(this)}
                    onLoad={this.onLoad.bind(this)}
                    onPlay={this.timeUpdate.bind(this)}
                    volume={this.state.volume}
                    mute={this.state.mute}

                    ref={(ref) => (this.howler = ref)}
                />

                <div className="track-status">

                    <div className="desc">
                        <div className="caption">
                            {this.state.track.name}
                        </div>
                    </div>

                    <div className="configs">

                        <div className="replay_trigger" onClick={this.reset.bind(this)}>
                            <RewindIcon className={"rewind"} fill={"white"} />
                        </div>

                        <div className="play_switch" onClick={this.playSwitch.bind(this)}>
                            {this.state.playing ? <PauseIcon className={"pause"} fill={"white"}/> : <PlayIcon className={"play"} fill={"white"} /> }
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
                            onMouseEnter={mouse.enterTrack.bind(this)}
                            onMouseMove={mouse.moveTrack.bind(this)}
                            onMouseLeave={mouse.leaveTrack.bind(this)}
                            onMouseDown={mouse.downTrack.bind(this)}
                            onMouseUp={mouse.upTrack.bind(this)}
                            ref={(track) => {
                                this.track = track;
                            }}
                        >

                            <div className="track_elapsed"
                                 style={{width: `${ this.state.time * this.state.timeIteration + 2 }px`}}></div>
                            <div className="dot_position"
                                 style={{transform: `translateX(${ this.state.time * this.state.timeIteration - 5 }px)`}}></div>
                        </div>

                        <div className="time_placeholder">
                            <div className="current_time active" ref={(currentTime) => {
                                this.currentTime = currentTime;
                            }}>{currentTime}</div>
                            <div className="intended_time" ref={(intendedTime) => {
                                this.intendedTime = intendedTime;
                            }}></div>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}