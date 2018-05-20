// React
import React, {Component} from "react";

export default class PauseIcon extends Component {
    render() {
        return (
            <svg className={this.props.className} version="1.1" x="0px" y="0px" viewBox="0 0 70 70" style={{enableBackground: "new 0 0 70 70"}} >
                <path fill={this.props.fill}
                      d="M52.5,0c-4.972,0-9,1.529-9,6.5v57c0,4.971,4.028,6.5,9,6.5c4.971,0,9-1.529,9-6.5v-57     C61.5,1.529,57.471,0,52.5,0z"></path>
                <path fill={this.props.fill}
                      d="M17.5,0c-4.972,0-9,1.529-9,6.5v57c0,4.971,4.028,6.5,9,6.5c4.971,0,9-1.529,9-6.5v-57     C26.5,1.529,22.471,0,17.5,0z"></path>
            </svg>
        )
    }
}