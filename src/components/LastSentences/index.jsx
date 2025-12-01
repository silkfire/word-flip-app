import { memo } from 'react'
import { format } from 'date-fns'
import styled from 'styled-components'

import ReactTimeAgo from 'react-time-ago'
import jtaStyle from '~/shared/jtaStyle'

const $SentenceList = styled.div`
  margin: 8px auto 0;

  font-family: 'Lato', sans-serif;
  transition-duration: 0.3s;
  opacity: ${({ sentences }) => +!!(sentences && sentences.length > 0)};

  @media only screen and (min-width: 48em) {
    padding: 0 4px;
  }
`

const $Sentence = styled.div`
  padding: 12px 10px;
  border-bottom: 1px solid #d4d4d4;
  text-align: left;
  font-size: 0.9rem;

  &:last-child {
    border-bottom: none;
  }

  @media only screen and (min-width: 48em) {
    padding: 15px 0;
    border-bottom: 1px solid #f0edea;
  }
`

const $CreatedTimestamp = styled(ReactTimeAgo)`
  color: #bdbdbd;
  font-size: 90%;
  float: right;
  margin: 0 0 0 14px;
  transition-duration: 0.2s;

  @media only screen and (min-width: 48em) {
    float: none;
    margin: 0 0 6px;
    position: relative;
    display: inline-block;

    &:before {
      width: calc(100% + 2px);
      height: 15px;
      background-color: #fff7e7;
      position: absolute;
      display: block;
      content: "";
      z-index: -1;
      margin: 4px 2px;
      transform: skew(0deg, -6deg);
      transition-duration: 0.2s;
    }

    &:hover {
      cursor: help;
      color: #fff;
      margin: 0 -4px 6px;
      border-right: 4px solid transparent;

      &:before {
        background-color: #669df9;
        transform: skew(0);
        width: calc(100% + 6px);
        height: 20px;
        margin: 0px calc(50% - 3px);
        left: -50%;
      }
    }
  }
`

function LastSentences({ sentences }) {
  return (
      <$SentenceList $sentences={sentences}>
          {sentences.map((s) => (<$Sentence key={s.id}>
                                    <$CreatedTimestamp date={new Date(s.created)}
                                                       formatVerboseDate={() => format(new Date(s.created), 'yyyy-MM-dd hh:mm:ss xxx')}
                                                       timeStyle={jtaStyle} />
                                    <div>
                                      {s.value}
                                    </div>
                                 </$Sentence>))}
      </$SentenceList>
  )
}

export default memo(LastSentences,
  (prevProps, nextProps) => {
    if (nextProps.sentences.length === 0) return true
    if (prevProps.sentences.length === 0) return false

    return prevProps.flippedSentenceId === nextProps.flippedSentenceId
  })
