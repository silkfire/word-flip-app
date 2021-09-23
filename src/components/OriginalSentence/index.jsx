import { useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'

const $OriginalSentence = styled.textarea`
  resize: none;
  outline: none;
  -webkit-appearance: none;

  width: 100%;

  font-family: Arial, Helvetica, sans-serif;
  padding: 5px;
  border: 1px solid #eaeaea;

  &::placeholder {
    color: #c7c7c7;
  }

  @media only screen and (min-width: 48em) {
    margin: 50px auto 0;
  }
`

export default function OriginalSentence({ value, onChangeAction, refInputNode }) {
  const onChangeActionWrapper = useCallback((e) => {
    onChangeAction(e.target.value)
  }, [onChangeAction])

  const inputNode = useRef()

  useEffect(() => refInputNode(inputNode), [refInputNode])

  return (
    <$OriginalSentence rows="10"
                       autoFocus
                       placeholder="Type a sentence here"
                       value={value}
                       onChange={onChangeActionWrapper}
                       ref={inputNode} />
  )
}
