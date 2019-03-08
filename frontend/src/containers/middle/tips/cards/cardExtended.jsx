// React
import React, {Component} from 'react'

// Icons
import ArrowIcon from 'Containers/svg/ArrowIcon.jsx'

// Components
import LoadIcon from './components/LoadIcon.jsx'

export default class CardExtended extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            loading: false,
            name: props.data.name,
        }
    }

    componentWillReceiveProps(props) {
        if (props.data.name === this.state.name) return;
        this.setState((state, props) => ({loading: false}))
    }

    handleClick() {
        this.setState((props, state) => {
            return {"loading": true}
        });
        this.props.loadTracks(this.props.data, this.props.index)
    }

    render() {
        const name = this.state.name;
        return (
            <div className='card_extended'>
                <div className="card_contents" onClick={this.handleClick.bind(this)}>
                    <ArrowIcon className={'arrow'} fill={'white'}/>
                    <div className="source"
                         style={{backgroundImage: `url(/images/sources/${this.props.data.source}.png)`}}></div>
                    <div className="label"><span title={name}>{name}</span></div>
                    {this.state.loading === true ? <LoadIcon/> : ""}
                </div>
            </div>
        )
    }
}
