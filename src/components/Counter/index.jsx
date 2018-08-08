import React, { Component } from 'react';

import './counter.css';

/**
 * A counter button: tap the button to increase the count.
 */
export default class Counter extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }
 
  render() {
    return (
      <button
        onClick={() => {
          this.setState({ count: this.state.count + 1 });
        }} styleName="tasty-button"
      >
        Count: {this.state.count}
      </button>
    );
  }
}