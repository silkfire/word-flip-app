import { memo } from 'react';
import { format } from 'date-fns';
import clsx from 'clsx';

import ReactTimeAgo from 'react-time-ago';
import jtaStyle from '@/shared/jtaStyle';

interface Sentence {
  id: string;
  value: string;
  created: string;
}

interface FlippedSentenceProps {
  sentence?: Sentence;
  className?: string;
}

function FlippedSentence({ sentence, className = '' }: FlippedSentenceProps) {
  const { id, value, created } = sentence || {};
  let createdTimestamp;

  if (id !== undefined && created !== undefined) {
    const createdDateTime = new Date(created);

    createdTimestamp = (
      <ReactTimeAgo
        className="float-right mr-1 ml-3 text-[90%] leading-6 text-gray-silver md:mr-[-4px] md:ml-0"
        date={createdDateTime}
        formatVerboseDate={() =>
          format(createdDateTime, 'yyyy-MM-dd hh:mm:ss xxx')
        }
        timeStyle={jtaStyle}
      />
    );
  }

  return (
    <div
      className={clsx(
        'border-b-2 border-blue-pastel bg-blue-ice px-2 py-5 text-left font-lato text-base leading-6',
        'md:border-r md:border-blue-pastel md:bg-blue-mist md:px-3',
        className,
      )}
    >
      {createdTimestamp}
      <div>{value}</div>
    </div>
  );
}

export default memo(FlippedSentence, (prevProps, nextProps) => {
  if (nextProps.sentence === undefined) return true;
  if (prevProps.sentence === undefined) return false;

  return prevProps.sentence.id === nextProps.sentence.id;
});
