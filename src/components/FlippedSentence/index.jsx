import React, { Component } from 'react';
import classNames from 'classnames';
import ReactTimeAgo from 'react-time-ago/no-tooltip'
import defaultStyle from 'javascript-time-ago/commonjs/style/default'
import { format as dateFormat } from 'date-fns'

import './flipped-sentence.css'


const { gradation, units } = defaultStyle;
const defaultStyleShort = {
  gradation,
  flavour: ['tiny'],
  units
};

export default class FlippedSentence extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { sentence, created } = this.props.sentence;
        const dateTime = new Date(created);

        return (
            <div styleName={classNames('default', { visible: sentence.length > 0 })}>
                {sentence.length > 0 && <ReactTimeAgo styleName="created" date={dateTime} formatVerboseDate={_ => dateFormat(dateTime, 'YYYY-MM-DD HH:mm:ss Z')} timeStyle={defaultStyleShort} />}
                <div>
                    {sentence}
                </div>
            </div>
        );
    }
}