import { memo } from 'react';
import { format } from 'date-fns';
import clsx from 'clsx';

import ReactTimeAgo from 'react-time-ago';
import jtaStyle from '@/shared/jtaStyle';
import { DATE_FORMAT_VERBOSE } from '@/shared/constants';
import { Sentence } from '@/shared/api';

interface LastSentencesProps {
  sentences: Sentence[];
  flippedSentenceId?: number;
}

function LastSentences({ sentences }: LastSentencesProps) {
  return (
    <div
      className={clsx(
        'mx-auto mt-6 flex max-w-3xl flex-col gap-3 px-3 pb-12 font-lato duration-500 md:px-1',
        sentences && sentences.length > 0
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0',
      )}
    >
      {sentences.map((s) => (
        <div
          key={s.id}
          className="group relative rounded-sm border border-gray-neutral bg-white px-1.5 py-3 transition-all duration-200 hover:border-blue-royal hover:shadow-md sm:pl-3 md:border-gray-200"
        >
          <div className="flex gap-1 sm:items-baseline sm:justify-between sm:gap-4">
            <div className="order-3 text-sm text-gray-400 sm:order-none md:text-[15px] group-hover:md:text-gray-900">
              {s.value}
            </div>
            <div className="order-2 pr-1 text-center text-(length:--text-xs) leading-5 text-gray-pale sm:order-none sm:hidden">
              ·
            </div>
            <ReactTimeAgo
              className="order-1 cursor-default pr-1 pl-1 text-center text-(length:--text-xs) leading-5 text-gray-400 sm:order-none group-hover:md:text-blue-royal"
              date={new Date(s.created)}
              formatVerboseDate={() =>
                format(new Date(s.created), DATE_FORMAT_VERBOSE)
              }
              timeStyle={jtaStyle}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(LastSentences);
