import React, { Component } from 'react';

import './original-sentence.css';


export default class OriginalSentence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.inputChanged = this.inputChanged.bind(this);
  }

  inputChanged(event) {
      this.setState({value: event.target.value});

      this.props.onChange(event.target.value);
  }
 
  render() {
    return (
      <textarea rows="10" styleName="default" autoFocus placeholder="Type a sentence here" value={this.state.value} onChange={this.inputChanged}/>
    );
  }
}