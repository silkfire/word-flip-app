import React, { Component } from 'react';

import './error-message.css';

export default class ErrorMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { message } = this.props;

        return (
            <div styleName="default">{!!message && `Error: ${message}`}</div>
        );
    }
}