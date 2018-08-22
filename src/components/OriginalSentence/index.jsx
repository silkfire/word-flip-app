import React, { Component } from 'react';

import './original-sentence.css';


export default class OriginalSentence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.inputChanged = this.inputChanged.bind(this);

    this.inputNode = React.createRef();
  }

  inputChanged(event) {
      this.setState({value: event.target.value});

      this.props.onChange(event.target.value);
  }



  componentDidMount() {
    this.props.refInputNode(this.inputNode);
  }

 
  render() {
    const { value } = this.props;

    return (
      <textarea rows="10" styleName="default" autoFocus placeholder="Type a sentence here" value={value} onChange={this.inputChanged} ref={this.inputNode} />
    );
  }
}