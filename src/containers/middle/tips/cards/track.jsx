// React
import React, {Component} from 'react';

// Icons
import {playIcon} from "Containers/svg.jsx"

export default class Track extends Component {

    constructor(props) {
        super(props);

        this.state = {
            track: props.track
        }
    }

    componentWillReceiveProps(props) {
        this.setState((state, props) => {
            return {
                track: props.track
            }
        });
    }

    handleClick() {
        if (this.state.isActive) return;
        this.props.onClick(this.state.track);
    }

    render() {

        let title = this.state.track.name;

        const source = this.state.track.source;

        return (
            <div className="card">
                <div className="order" onClick={this.handleClick.bind(this)}>
                    <div className="status">
                        {playIcon({fill: "white"})}
                    </div>
                    <div className="id">{this.props.id + 1}.</div>
                </div>
                {/*<div className="source" style={{backgroundImage: `url(/images/sources/${source}.png)`}}></div>*/}
                <div className="label">
                    <span title={title}>{title}</span>
                </div>
            </div>
        )
    }

}