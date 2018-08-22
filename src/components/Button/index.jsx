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
    const { disabled, style, text } = this.props;

    return (
      <div styleName={classNames('default', { disabled })} style={style} onClick={this.onClick}>{text}</div>
    );
  }
}