import React, { Component } from 'react';
import classNames from 'classnames';

import './button.css';


export default class Button extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
      if (!this.props.disabled) {
         this.props.onClick();
      }
  }

  render() {
    return (
      <div styleName={classNames('default', { 'disabled': this.props.disabled })} style={this.props.style} onClick={this.onClick}>{this.props.text}</div>
    );
  }
}