import React, { Component } from 'react';
import ReactTimeAgo from 'react-time-ago/no-tooltip'
import defaultStyle from 'javascript-time-ago/commonjs/style/default'
import { format as dateFormat } from 'date-fns'

import './last-sentences.css';

const { gradation, units } = defaultStyle;
const defaultStyleShort = {
  gradation,
  flavour: ['tiny'],
  units
};

export default class LastSentences extends Component {
  componentDidMount() {
    this.props.getLastSentences();
  }

 
  render() {
    const { sentences } = this.props;

    return (
      <div styleName="container">{
          sentences.map(s => (<div key={s.id} styleName="sentence">
                                <ReactTimeAgo styleName="created" date={new Date(s.created)} formatVerboseDate={_ => dateFormat(new Date(s.created), 'YYYY-MM-DD HH:mm:ss Z')} timeStyle={defaultStyleShort} />
                                <div>
                                  {s.sentence}
                                </div>
                              </div>))
      }</div>
    );
  }
}