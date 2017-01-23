import React from 'react';

class DummyCard extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      isLoaded: this.props.isLoaded ? "loaded" : "",
      isFrozen: this.props.isFrozen ? "frozen" : ""
    }

  }
  
  componentWillReceiveProps(props) {
    this.setState({
      isLoaded: props.isLoaded ? "loaded" : "",
      isFrozen: props.isFrozen ? "frozen" : ""
    });
  }
  
  render() {
    const cardClasses = "card dummy" + " " +  this.state.isLoaded + " " + this.state.isFrozen;
    
    return(
      <div className={ cardClasses }></div>
    )
  }
  
}

export default DummyCard;
