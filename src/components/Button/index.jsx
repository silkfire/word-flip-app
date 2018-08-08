import React, { Component } from 'react';

import './button.css';


export default class Button extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
      this.props.onClick();
  }

  render() {
    return (
      <div styleName="default" style={this.props.style} onClick={this.onClick}>{this.props.text}</div>
    );
  }
}