import React, { memo } from 'react';
import dateFormat from 'date-fns/format';

import './flipped-sentence.css';

import ReactTimeAgo from 'react-time-ago';
import JTADefaultStyle from '~/shared/jta';

function FlippedSentence({ sentence: { id, value, created } = {} }) {
  let timeAgo;

  if (id !== undefined) {
    const createdDateTime = new Date(created);

    timeAgo = <ReactTimeAgo styleName="created"
                            date={createdDateTime}
                            formatVerboseDate={() => dateFormat(createdDateTime, 'yyyy-MM-dd HH:mm:ss XXX')}
                            timeStyle={JTADefaultStyle} />;
  }

  return (
        <div styleName="default">
            {timeAgo}
            <div>
                {value}
            </div>
        </div>
  );
}

export default memo(FlippedSentence, (prevProps, nextProps) => {
  if (nextProps.sentence === undefined) return true;
  if (prevProps.sentence === undefined) return false;

  return prevProps.sentence.id === nextProps.sentence.id;
});
