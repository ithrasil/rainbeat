// React
import React, {Component} from "react";

export default class PlayIcon extends Component {
    render() {
        return (
            <svg className={this.props.className} version="1.1" x="0px" y="0px" viewBox="0 0 232.153 232.153"
                 style={{enableBackground: "new 0 0 232.153 232.153"}}>
                <path fill={this.props.fill}
                      d="M203.791,99.628L49.307,2.294c-4.567-2.719-10.238-2.266-14.521-2.266   c-17.132,0-17.056,13.227-17.056,16.578v198.94c0,2.833-0.075,16.579,17.056,16.579c4.283,0,9.955,0.451,14.521-2.267   l154.483-97.333c12.68-7.545,10.489-16.449,10.489-16.449S216.471,107.172,203.791,99.628z"></path>
            </svg>
        )
    }
}