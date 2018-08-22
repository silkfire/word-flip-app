import React, { Component } from 'react';

import './last-sentences.css';

export default class LastSentences extends Component {
  componentDidMount() {
    this.props.getLastSentences();
  }

 
  render() {
    const { sentences } = this.props;

    return (
      <div styleName="container">{
          sentences.map(s => (<div key={s.id} styleName="sentence">{s.sentence}</div>))
      }</div>
    );
  }
}