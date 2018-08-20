import React, { Component } from 'react'
import { hot } from 'react-hot-loader';
import { flip, getLastSentences } from '~/shared/api.js'

import OriginalSentence from '../OriginalSentence/index.jsx';
import Button from '../Button/index.jsx';
import ErrorMessage from '../ErrorMessage/index.jsx';
import LastSentences from '../LastSentences/index.jsx';

import './app.css';


const maxLastSentenceCount = 5;

class App extends Component {
  constructor() {
    super();

    this.state = {
      originalSentence: '',
      errorMessage: false,
      lastSentences: []
    };
  }


  onOriginalSentenceChange(value) {
    this.setState({originalSentence: value});
  }
  

  getLastSentences() {
    getLastSentences().then(data => this.setState({errorMessage: data.error,  lastSentences: data.body && JSON.parse(data.body).slice(0, maxLastSentenceCount + 1) || [] }));
  }

  flip() {
    flip(this.state.originalSentence).then(() => this.getLastSentences());
  }




  render() {
    return (
      <div styleName="container">
          <div styleName="input-container">
            <OriginalSentence onChange={this.onOriginalSentenceChange.bind(this)}/>
  
            <div styleName="button-container">
                <ErrorMessage message={this.state.errorMessage} />
                <Button text="Flip" style={{ marginTop: '12px', width: '80px' }} onClick={this.flip.bind(this)} disabled={this.state.originalSentence.trim().length == 0} />
            </div>
          </div>

          <LastSentences getLastSentences={this.getLastSentences.bind(this)} sentences={this.state.lastSentences} />
      </div>
    );
  }
}


export default hot(module)(App);