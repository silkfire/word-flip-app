import React, { Component } from 'react';
import classNames from 'classnames';

import './flipped-sentence.css'

export default class FlippedSentence extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { sentence } = this.props;

        return (
            <div styleName={classNames('default', { visible: sentence.length > 0 })}>{sentence}</div>
        );
    }
}