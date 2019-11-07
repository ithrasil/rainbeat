// React
import React, {Component} from 'react'

// Icons
import ExitIcon from 'Containers/svg/ExitIcon.jsx'

export default class CardEmpty extends Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        const arrayWithoutElementAtIndex = function (arr, index) {
            return arr.filter(function(value, arrIndex) {
                return index !== arrIndex;
            });
        };
        this.props.update(arrayWithoutElementAtIndex(this.props.items, this.props.index).slice());
    }

    render() {
        return (
            <div className={'card_extended_loaded '}>
                <div className="card_contents" onClick={this.handleClick.bind(this)}>
                    <ExitIcon className={'card_icon'} fill={'white'}/>
                    <div className="label"><span title={this.props.data.name}>{this.props.data.name}(<b>empty)</b></span></div>
                </div>
            </div>
        )
    }
}
