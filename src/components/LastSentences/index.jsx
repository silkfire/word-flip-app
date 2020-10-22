import React, { memo } from 'react';
import classNames from 'classnames';
import dateFormat from 'date-fns/format';

import './last-sentences.css';

import ReactTimeAgo from 'react-time-ago';
import JTADefaultStyle from '~/shared/jta';

function LastSentences({ sentences }) {
  return (
      <div styleName={classNames('container', { visible: sentences && sentences.length > 0 })}>{
          sentences.map((s) => (<div key={s.id} styleName="sentence">
                                <ReactTimeAgo styleName="created"
                                              date={new Date(s.created)}
                                              formatVerboseDate={() => dateFormat(new Date(s.created), 'yyyy-MM-dd HH:mm:ss XXX')}
                                              timeStyle={JTADefaultStyle} />
                                <div>
                                  {s.value}
                                </div>
                              </div>))
      }</div>
  );
}

export default memo(LastSentences,
  (prevProps, nextProps) => {
    if (nextProps.sentences.length === 0) return true;
    if (prevProps.sentences.length === 0) return false;

    return prevProps.flippedSentenceId === nextProps.flippedSentenceId;
  });
