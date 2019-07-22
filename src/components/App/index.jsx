import React, { Component } from 'react'
import classNames from 'classnames';
import { hot } from 'react-hot-loader/root';
import { flip, getLastSentences } from '~/shared/api.js'

import OriginalSentence from '../OriginalSentence/index.jsx';
import Button from '../Button/index.jsx';
import ErrorMessage from '../ErrorMessage/index.jsx';
import FlippedSentence from '../FlippedSentence/index.jsx';
import LastSentences from '../LastSentences/index.jsx';

import './app.css';

const maxSentenceCount = process.env.MAX_SENTENCE_COUNT;

class App extends Component {
  constructor() {
    super();

    this.state = {
      originalSentence: '',
      isLoading: false,
      flippedSentence: { sentence: '' },
      errorMessage: false,
      lastSentences: []
    };
  }


  onOriginalSentenceChange(value) {
    this.setState({originalSentence: value});
  }
  

  getLastSentences() {
    getLastSentences().then(data => this.setState({
      errorMessage: data.error,
      lastSentences: data.body && JSON.parse(data.body).slice(0, maxSentenceCount) || [] }));
  }

  flip() {
    this.setState({
      isLoading: true
    });

    flip(this.state.originalSentence).then(data => {
      const { error, body } = data;

      this.setState({
        originalSentence: body ? '' : this.state.originalSentence,
        isLoading: false,
        flippedSentence: body || this.state.flippedSentence,
        errorMessage: error,
        lastSentences: body && [ body, ...this.state.lastSentences].slice(0, maxSentenceCount) || this.state.lastSentences
      });

      if (body) {
        this.originalSentenceInputNode.current.focus();
      }
    });
  }

  refInputNode(inputNode) {
    this.originalSentenceInputNode = inputNode;
  }




  render() {
    const { originalSentence, errorMessage, flippedSentence, lastSentences } = this.state;

    return (
      <div styleName="container">
          <div styleName="input-container">
            <OriginalSentence onChange={this.onOriginalSentenceChange.bind(this)} value={originalSentence} refInputNode={this.refInputNode.bind(this)} />
  
            <div styleName="button-container">
                <ErrorMessage message={errorMessage} />

                <div styleName={classNames( 'loader', 'fade', { visible: this.state.isLoading }, { hidden: !this.state.isLoading } )}></div>
                <Button text="Flip" style={{ marginTop: '12px', width: '80px' }} onClick={this.flip.bind(this)} disabled={originalSentence.trim().length == 0 || !!this.state.errorMessage} styleName={classNames('fade', { visible: !this.state.isLoading }, { hidden: this.state.isLoading })} />
            </div>

            <FlippedSentence sentence={flippedSentence} />
          </div>

          <LastSentences getLastSentences={this.getLastSentences.bind(this)} sentences={lastSentences.slice(+(flippedSentence.sentence.length > 0))} />
      </div>
    );
  }
}


export default hot(App);