import { memo } from 'react';
import { format } from 'date-fns';
import clsx from 'clsx';

import ReactTimeAgo from 'react-time-ago';
import jtaStyle from '@/shared/jtaStyle';
import { DATE_FORMAT_VERBOSE } from '@/shared/constants';
import { Sentence } from '@/shared/api';

interface FlippedSentenceProps {
  sentence: Sentence | null | undefined;
  className?: string;
}

function FlippedSentence({ sentence, className = '' }: FlippedSentenceProps) {
  let createdTimestamp;

  if (sentence) {
    const createdDateTime = new Date(sentence.created);

    createdTimestamp = (
      <ReactTimeAgo
        className="ml-auto cursor-default text-[90%] leading-6 text-gray-silver"
        date={createdDateTime}
        formatVerboseDate={() => format(createdDateTime, DATE_FORMAT_VERBOSE)}
        timeStyle={jtaStyle}
      />
    );
  }

  return (
    <div className="px-2 md:px-0">
      <div
        className={clsx(
          'rounded-sm border border-blue-pastel bg-blue-ice px-2 py-2 text-left font-lato text-blue-900',
          'flex text-base leading-6 font-[15px] md:border-r md:border-blue-pastel md:bg-blue-mist md:px-3 md:py-3',
          className,
        )}
      >
        {sentence && (
          <>
            <div>{sentence.value}</div>
            {createdTimestamp}
          </>
        )}
      </div>
    </div>
  );
}

export default memo(FlippedSentence, (prevProps, nextProps) => {
  return prevProps.sentence?.value === nextProps.sentence?.value;
});
