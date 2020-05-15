import React, { useEffect, useRef, useCallback } from 'react';

import './original-sentence.css';


export default function OriginalSentence({ value, onChangeAction, refInputNode }) {
  const onChangeActionWrapper = useCallback((e) => {
    onChangeAction(e.target.value);
  }, [onChangeAction]);

  const inputNode = useRef();

  useEffect(() => refInputNode(inputNode), [refInputNode]);

  return (
    <textarea rows="10"
              styleName="default"
              autoFocus
              placeholder="Type a sentence here"
              value={value}
              onChange={onChangeActionWrapper}
              ref={inputNode} />
  );
}
