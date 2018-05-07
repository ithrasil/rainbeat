// React
import React, {Component} from "react";

export default class PauseIcon extends Component {
    render() {
        return (
            <svg className={this.props.className} version="1.1" x="0px" y="0px" viewBox="0 0 491.86 491.86"
                 style={{enableBackground: "new 0 0 491.86 491.86"}}>
                <path fill={this.props.fill}
                      d="M465.167,211.614H280.245V26.691c0-8.424-11.439-26.69-34.316-26.69s-34.316,18.267-34.316,26.69v184.924H26.69    C18.267,211.614,0,223.053,0,245.929s18.267,34.316,26.69,34.316h184.924v184.924c0,8.422,11.438,26.69,34.316,26.69    s34.316-18.268,34.316-26.69V280.245H465.17c8.422,0,26.69-11.438,26.69-34.316S473.59,211.614,465.167,211.614z"></path>
            </svg>
        )
    }
}

