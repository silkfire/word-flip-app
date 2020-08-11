import React, { memo } from 'react';
import defaultStyle from 'javascript-time-ago/commonjs/style/default';
import dateFormat from 'date-fns/format';

import './flipped-sentence.css';

import ReactTimeAgo from 'react-time-ago';

const { gradation, units } = defaultStyle;
const defaultStyleShort = {
  gradation,
  flavour: ['tiny'],
  units,
};

function FlippedSentence({ sentence: { id, value, created } = {} }) {
  let timeAgo;

  if (id !== undefined) {
    const createdDateTime = new Date(created);

    timeAgo = <ReactTimeAgo styleName="created"
                            date={createdDateTime}
                            formatVerboseDate={() => dateFormat(createdDateTime, 'yyyy-MM-dd HH:mm:ss XXX')}
                            timeStyle={defaultStyleShort} />;
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
