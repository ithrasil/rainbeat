// React
import React, {Component} from 'react';

// Icons
import BurgerIcon from "Containers/svg/BurgerIcon.jsx";
import ExitIcon from "Containers/svg/ExitIcon.jsx";

export default class Right extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }
    }

    changeVisibility() {
        this.setState((state, props) => {
            return {
                visible: !this.state.visible
            }
        })
    }

    render() {

        const visibility = this.state.visible ? "visible" : "";

        return (
            <div className={visibility + " right"}>
                <div className="visibility" onClick={this.changeVisibility.bind(this)}>
                    {this.state.visible ? <ExitIcon className={"exit"} fill={"white"} /> : <BurgerIcon className={"exit"} fill={"white"} />}
                </div>
            </div>
        )

    }
}