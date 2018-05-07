// React
import React, {Component} from 'react';

export default class DotMenuIcon extends Component{
    render() {
        return (
            <svg className={this.props.className} x="0px" y="0px" viewBox="0 0 60 60" width="512px" height="512px"
                 style={{enableBackground: "enable-background:new 0 0 60 60"}}>
                <path d="M30,16c4.411,0,8-3.589,8-8s-3.589-8-8-8s-8,3.589-8,8S25.589,16,30,16z" fill={this.props.fill}/>
                <path d="M30,44c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,44,30,44z" fill={this.props.fill}/>
                <path d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z" fill={this.props.fill}/>
            </svg>
        )
    }
}
