import React, { Component } from 'react'
import { hot } from 'react-hot-loader';
import { flip, getLastSentences } from '~/shared/api.js'

import OriginalSentence from '../OriginalSentence/index.jsx';
import Button from '../Button/index.jsx';
import LastSentences from '../LastSentences/index.jsx';

import './app.css';


// const flipAndGetLastSentences = () => {
//     flip
// }


class App extends Component {
  constructor() {
    super();

    this.state = {
      originalSentence: '',
      lastSentences: [],
      maxLastSentenceCount: 0
    };
  }


  onOriginalSentenceChange(value) {
    this.setState({originalSentence: value});
  }
  
  flip() {
    flip(this.state.originalSentence).then(() => this.getLastSentences());
  }

  getLastSentences() {
    getLastSentences().then(data => this.setState({sentences: data, maxLastSentenceCount: data.length}));
  }



  render() {
    return (
      <div styleName="container">
          <OriginalSentence onChange={this.onOriginalSentenceChange.bind(this)}/>

          <div styleName="button-container">
              <Button text="Flip" style={{ marginTop: '12px', width: '80px' }} onClick={this.flip.bind(this)}/>
          </div>

          <LastSentences getLastSentences={this.getLastSentences.bind(this)} sentences={this.state.lastSentences.slice(0, this.state.maxLastSentenceCount)} />
      </div>
    );
  }
}


export default hot(module)(App);