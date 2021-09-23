import { useState, useEffect, useCallback } from 'react'

import 'sanitize.css'
import styled from 'styled-components'
import { $FadeWrapper } from '~/shared/styles'

import { flip, getLastSentences } from '~/shared/api'

import OriginalSentence from '../OriginalSentence'
import FlipButton from '../Button'
import FlipSentenceSpinner from '../Spinner'
import ErrorMessage from '../ErrorMessage'
import FlippedSentence from '../FlippedSentence'
import LastSentencesLoader from '../Loader'
import LastSentences from '../LastSentences'

const API_OFFLINE_MESSAGE = 'WordFlip API service offline.'
const MAX_SENTENCE_COUNT = 10

const $App = styled.div`
  margin: 0 auto;
  width: 100%;

  @media only screen and (min-width: 48em) {
    width: 590px;
  }
`

const $InputContainer = styled.div`
  padding: 4px 4px 0;
`

const $InputContainerFooter = styled.div`
  overflow: hidden;
  position: relative;
`

const $ErrorMessageWrapper = styled($FadeWrapper)`
  float: left;
  margin: 22px 2px 0;
`

const $FlipSentenceSpinnerWrapper = styled($FadeWrapper)`
  margin: 8px 15px 0;

  position: absolute;
  right: 0;
`

const $FlipButtonWrapper = styled($FadeWrapper)`
  margin: 12px 0 0;
`

const $FlipButton = styled(FlipButton)`
  width: 80px;
`

const $FlippedSentenceContainer = styled.div`
  height: ${({ $isVisible }) => ($isVisible ? 'auto' : 0)};
  overflow: hidden;
`

const $FlippedSentenceWrapper = styled(FlippedSentence)`
  transition: transform 0.25s ease-in-out;
  transform: translateY(-25%);
  
  ${({ $isVisible }) => ($isVisible && `
    transform: initial;
    margin: 16px 0 0;

    @media only screen and (min-width: 48em) {
      margin: 22px 0 0;
    }
  `)}
`

const $LastSentencesContainer = styled.div`
  position: relative;
`

const $LastSentencesLoaderWrapper = styled($FadeWrapper)`
  position: absolute;
  left: 50%;
  margin: -9px 0;
  transform: translate(-50%, -65%) scale(0.7);

  @media only screen and (min-width: 48em) {
    transform: translate(-50%, -65%) scale(1);
  }
`

const App = () => {
  const [lastSentences, setLastSentences] = useState([])
  const [originalSentence, setOriginalSentence] = useState('')
  const [originalSentenceInputNode, setOriginalSentenceInputNode] = useState(undefined)
  const [isLoadingLastSentences, setLoadingStateLastSentences] = useState(true)
  const [isFlipping, setFlippingState] = useState(false)
  const [flippedSentence, setFlippedSentence] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)

  const refInputNode = useCallback((inputNode) => {
    setOriginalSentenceInputNode(inputNode)
  }, [])

  const originalSentenceChangedAction = useCallback((value) => setOriginalSentence(value), [])
  const flipAction = useCallback(() => {
    setFlippingState(true)

    flip(originalSentence).then((data) => {
      setOriginalSentence('')

      if (flippedSentence !== undefined) setLastSentences([flippedSentence, ...lastSentences].slice(0, MAX_SENTENCE_COUNT))
      setFlippedSentence(data)

      originalSentenceInputNode.current.focus()
    }).catch(({ error }) => {
      setErrorMessage(error || API_OFFLINE_MESSAGE)
    }).finally(() => {
      setFlippingState(false)
    })
  }, [originalSentence, originalSentenceInputNode, lastSentences, flippedSentence])

  useEffect(() => {
    getLastSentences().then((data) => {
      setErrorMessage(undefined)
      setLastSentences(data.slice(0, MAX_SENTENCE_COUNT))
    }).catch(({ error }) => {
      setErrorMessage(error || API_OFFLINE_MESSAGE)
    }).finally(() => {
      setLoadingStateLastSentences(false)
    })
  }, [])

  return (
      <$App>
        <$InputContainer>
          <OriginalSentence value={originalSentence}
                            onChangeAction={originalSentenceChangedAction}
                            refInputNode={refInputNode} />

          <$InputContainerFooter>
              <$ErrorMessageWrapper $isHidden={errorMessage === undefined}>
                <ErrorMessage message={errorMessage} />
              </$ErrorMessageWrapper>

              <$FlipSentenceSpinnerWrapper $isHidden={!isFlipping}>
                <FlipSentenceSpinner />
              </$FlipSentenceSpinnerWrapper>

              <$FlipButtonWrapper $isHidden={isFlipping}>
                <$FlipButton text="Flip"
                             onClick={flipAction}
                             disabled={originalSentence.trim().length === 0 || errorMessage !== undefined} />
              </$FlipButtonWrapper>
          </$InputContainerFooter>

          <$FlippedSentenceContainer $isVisible={!!flippedSentence}>
            <$FlippedSentenceWrapper $isVisible={!!flippedSentence} sentence={flippedSentence} />
          </$FlippedSentenceContainer>
        </$InputContainer>

        <$LastSentencesContainer>
          <$LastSentencesLoaderWrapper $isHidden={!isLoadingLastSentences}>
            <LastSentencesLoader color="#5a80ea" />
          </$LastSentencesLoaderWrapper>
          <LastSentences sentences={lastSentences} flippedSentenceId={flippedSentence && flippedSentence.id} />
        </$LastSentencesContainer>
      </$App>
  )
}

export default App
