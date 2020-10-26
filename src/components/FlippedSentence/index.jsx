import React, { memo } from 'react';
import dateFormat from 'date-fns/format';
import styled from 'styled-components';

import ReactTimeAgo from 'react-time-ago';
import JTADefaultStyle from '~/shared/jta';

const $FlippedSentence = styled.div`
  font-family: 'Lato', sans-serif;

  background-color: #edf0fb;
  text-align: left;
  font-size: 1rem;
  line-height: 1.5rem;

  padding: 20px 8px;

  border-bottom: 2px solid #a6c3ff;

  @media only screen and (min-width: 48em) {
    background-color: #f2f4ff;
    border-right: 1px solid #a6c3ff;
    padding: 20px 12px;
  }
`;

const $CreatedTimestamp = styled(ReactTimeAgo)`
  color: #bdbdbd;
  font-size: 90%;
  float: right;
  line-height: 1.5rem;
  margin: 0 4px 0 12px;

  @media only screen and (min-width: 48em) {
    margin: 0 -4px 0 0;
  }
`;

function FlippedSentence({ sentence: { id, value, created } = {}, className }) {
  let createdTimestamp;

  if (id !== undefined) {
    const createdDateTime = new Date(created);

    createdTimestamp = <$CreatedTimestamp date={createdDateTime}
                                          formatVerboseDate={() => dateFormat(createdDateTime, 'yyyy-MM-dd HH:mm:ss XXX')}
                                          timeStyle={JTADefaultStyle} />;
  }

  return (
        <$FlippedSentence className={className}>
            {createdTimestamp}
            <div>
                {value}
            </div>
        </$FlippedSentence>
  );
}

export default memo(FlippedSentence, (prevProps, nextProps) => {
  if (nextProps.sentence === undefined) return true;
  if (prevProps.sentence === undefined) return false;

  return prevProps.sentence.id === nextProps.sentence.id;
});
