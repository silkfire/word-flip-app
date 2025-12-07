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

interface LastSentencesProps {
  sentences: Sentence[];
  flippedSentenceId?: string;
}

function LastSentences({ sentences }: LastSentencesProps) {
  return (
    <div
      className={clsx(
        'mx-auto mt-2 font-lato duration-300 md:px-1',
        sentences && sentences.length > 0 ? 'opacity-100' : 'opacity-0',
      )}
    >
      {sentences.map((s) => (
        <div
          key={s.id}
          className="border-b border-gray-neutral px-2.5 py-3 text-left text-[0.9rem] last:border-b-0 md:border-gray-warm md:px-0 md:py-[15px]"
        >
          <ReactTimeAgo
            className={clsx(
              'float-right ml-[14px] text-[90%] text-gray-silver duration-200',
              'md:relative md:float-none md:mb-[6px] md:ml-0 md:inline-block',
              "md:before:absolute md:before:-z-10 md:before:mx-0.5 md:before:my-1 md:before:block md:before:h-[15px] md:before:w-[calc(100%+2px)] md:before:-skew-y-6 md:before:bg-light-cream md:before:duration-200 md:before:content-['']",
              'md:hover:mx-[-4px] md:hover:mb-[6px] md:hover:cursor-help md:hover:border-r-4 md:hover:border-transparent md:hover:text-white',
              'md:hover:before:left-[-50%] md:hover:before:mx-[calc(50%-3px)] md:hover:before:h-[20px] md:hover:before:w-[calc(100%+6px)] md:hover:before:skew-y-0 md:hover:before:bg-blue-sky',
            )}
            date={new Date(s.created)}
            formatVerboseDate={() =>
              format(new Date(s.created), 'yyyy-MM-dd hh:mm:ss xxx')
            }
            timeStyle={jtaStyle}
          />
          <div>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

export default memo(LastSentences, (prevProps, nextProps) => {
  if (nextProps.sentences.length === 0) return true;
  if (prevProps.sentences.length === 0) return false;

  return prevProps.flippedSentenceId === nextProps.flippedSentenceId;
});
