import { hot } from 'react-hot-loader/root';
import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { flip, getLastSentences } from '~/shared/api';

// eslint-disable-next-line no-unused-vars
import appStyles from './app.css';
// eslint-disable-next-line no-unused-vars
import sharedStyles from '../../css/shared.css';

import OriginalSentence from '../OriginalSentence';
import FlipButton from '../Button';
import FlipSentenceSpinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import FlippedSentence from '../FlippedSentence';
import LastSentencesLoader from '../Loader';
import LastSentences from '../LastSentences';

const API_OFFLINE_MESSAGE = 'WordFlip API service offline.';
const { MAX_SENTENCE_COUNT } = process.env;


const App = () => {
  const [lastSentences, setLastSentences] = useState([]);
  const [originalSentence, setOriginalSentence] = useState('');
  const [originalSentenceInputNode, setOriginalSentenceInputNode] = useState(undefined);
  const [isLoadingLastSentences, setLoadingStateLastSentences] = useState(true);
  const [isFlipping, setFlippingState] = useState(false);
  const [flippedSentence, setFlippedSentence] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const refInputNode = useCallback((inputNode) => {
    setOriginalSentenceInputNode(inputNode);
  }, []);

  const originalSentenceChangedAction = useCallback((value) => (setOriginalSentence(value)), []);
  const flipAction = useCallback(() => {
    setFlippingState(true);

    flip(originalSentence).then((data) => {
      setOriginalSentence('');

      if (flippedSentence !== undefined) setLastSentences([flippedSentence, ...lastSentences].slice(0, MAX_SENTENCE_COUNT));
      setFlippedSentence(data);

      originalSentenceInputNode.current.focus();
    }).catch(({ error }) => {
      setErrorMessage(error || API_OFFLINE_MESSAGE);
    }).finally(() => {
      setFlippingState(false);
    });
  }, [originalSentence, originalSentenceInputNode, lastSentences, flippedSentence]);

  useEffect(() => {
    getLastSentences().then((data) => {
      setErrorMessage(undefined);
      setLastSentences(data.slice(0, MAX_SENTENCE_COUNT));
    }).catch(({ error }) => {
      setErrorMessage(error || API_OFFLINE_MESSAGE);
    }).finally(() => {
      setLoadingStateLastSentences(false);
    });
  }, []);


  return (
      <div styleName="appStyles.container">
          <div styleName="appStyles.input-container">
            <OriginalSentence value={originalSentence}
                              onChangeAction={originalSentenceChangedAction}
                              refInputNode={refInputNode} />

            <div styleName="appStyles.button-container">
                <div styleName={classNames('appStyles.error-message-container', 'sharedStyles.fade', { 'sharedStyles.hidden': errorMessage === undefined })}>
                  <ErrorMessage message={errorMessage} />
                </div>

                <div styleName={classNames('appStyles.flip-sentence-spinner-wrapper', 'sharedStyles.fade', { 'sharedStyles.hidden': !isFlipping })}>
                  <FlipSentenceSpinner />
                </div>

                <div styleName={classNames('appStyles.flip-button-wrapper', 'sharedStyles.fade', { 'sharedStyles.hidden': isFlipping })}>
                  <FlipButton text="Flip" style={{ width: '80px' }}
                          onClick={flipAction}
                          disabled={ originalSentence.trim().length === 0
                                  || errorMessage !== undefined } />
                </div>
            </div>


            <div styleName={classNames('appStyles.flipped-sentence-wrapper-outer', { 'appStyles.visible': !!flippedSentence })}>
              <div styleName="appStyles.flipped-sentence-wrapper-inner">
                <FlippedSentence sentence={flippedSentence} />
              </div>
            </div>
          </div>

          <div styleName="appStyles.last-sentences-wrapper">
            <div styleName={classNames('appStyles.loader-wrapper', 'sharedStyles.fade', { 'sharedStyles.hidden': !isLoadingLastSentences })}>
                <LastSentencesLoader color={'#5a80ea'} />
            </div>

            <LastSentences sentences={lastSentences}
                          flippedSentenceId={flippedSentence && flippedSentence.id} />
          </div>
      </div>
  );
};


export default hot(App);
