import React, { Component } from 'react';

import './error-message.css';

export default class ErrorMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div styleName="default">{!!this.props.message && `Error: ${this.props.message}`}</div>
        );
    }
}