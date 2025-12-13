import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';

import {
  PaginatedResult,
  Sentence,
  flip,
  getLastSentences,
} from '@/shared/api';

import FadeWrapper from '../FadeWrapper';
import OriginalSentence from '../OriginalSentence';
import FlipButton from '../Button';
import FlipSentenceSpinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import FlippedSentence from '../FlippedSentence';
import LastSentencesLoader from '../Loader';
import Pagination from '../Pagination';
import LastSentences from '../LastSentences';

const App = () => {
  const [lastSentences, setLastSentences] =
    useState<PaginatedResult<Sentence> | null>(null);
  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined);
  const [originalSentence, setOriginalSentence] = useState('');
  const [originalSentenceInputNode, setOriginalSentenceInputNode] = useState<
    React.RefObject<HTMLTextAreaElement | null> | undefined
  >(undefined);
  const [isLoadingLastSentences, setLoadingStateLastSentences] = useState(true);
  const [isFlipping, setFlippingState] = useState(false);
  const [flippedSentence, setFlippedSentence] = useState<
    Sentence | null | undefined
  >(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const refInputNode = useCallback(
    (inputNode: React.RefObject<HTMLTextAreaElement | null>) => {
      setOriginalSentenceInputNode(inputNode);
    },
    [],
  );

  const originalSentenceChangedAction = useCallback(
    (value: string) => setOriginalSentence(value),
    [],
  );
  const flipAction = useCallback(() => {
    setFlippingState(true);

    flip(originalSentence, currentPage)
      .then((data) => {
        setOriginalSentence('');

        if (data) {
          setLastSentences(data.lastSentences);
          setFlippedSentence(data.flippedSentence);

          originalSentenceInputNode?.current?.focus();
        }
      })
      .catch(({ error }: { error: string }) => {
        setErrorMessage(error);
      })
      .finally(() => {
        setFlippingState(false);
      });
  }, [
    originalSentence,
    originalSentenceInputNode,
    lastSentences,
    flippedSentence,
    currentPage,
  ]);

  const onPageChange = useCallback((page: number) => {
    setLoadingStateLastSentences(true);

    getLastSentences(page)
      .then((data) => {
        setLastSentences(data);
        setCurrentPage(page);
      })
      .catch((e) => {
        console.error('Error fetching last sentences:', e);
      })
      .finally(() => {
        setLoadingStateLastSentences(false);
      });
  }, []);

  useEffect(() => {
    getLastSentences()
      .then((data) => {
        setErrorMessage(undefined);
        setLastSentences(data);
      })
      .catch((e) => {
        setErrorMessage('The WordFlip API service is currently offline.');
        console.error('Error fetching last sentences:', e);
      })
      .finally(() => {
        setLoadingStateLastSentences(false);
      });
  }, []);

  return (
    <div className="mx-auto w-full pb-5 md:w-[590px] md:pb-20">
      <div className="px-1 pt-1 pb-0">
        <OriginalSentence
          value={originalSentence}
          onChangeAction={originalSentenceChangedAction}
          refInputNode={refInputNode}
        />

        <div className="mt-2 flex items-center">
          <FadeWrapper isHidden={errorMessage === undefined} className="">
            <ErrorMessage message={errorMessage} />
          </FadeWrapper>

          <FadeWrapper
            isHidden={!isFlipping}
            className="absolute right-0 mt-2 mr-[15px] mb-0"
          >
            <FlipSentenceSpinner />
          </FadeWrapper>

          <FadeWrapper isHidden={isFlipping} className="ml-auto">
            <FlipButton
              text="Flip"
              onClick={flipAction}
              isDisabled={
                originalSentence.trim().length === 0 ||
                errorMessage !== undefined
              }
              className="ml-auto w-[80px] rounded-sm"
            />
          </FadeWrapper>
        </div>

        <div
          className={clsx(
            'overflow-hidden',
            flippedSentence ? 'h-auto' : 'h-0',
          )}
        >
          <FlippedSentence
            sentence={flippedSentence}
            className={clsx(
              'transition-transform duration-250 ease-in-out',
              flippedSentence !== undefined
                ? 'mt-4 translate-y-0 md:mt-[22px]'
                : 'translate-y-[-25%]',
            )}
          />
        </div>
      </div>

      <div className="relative">
        <FadeWrapper
          isHidden={!isLoadingLastSentences}
          className="absolute left-1/2 my-[-9px] translate-x-[-50%] translate-y-[-65%] scale-70 md:scale-100"
        >
          <LastSentencesLoader color="#5a80ea" />
        </FadeWrapper>
        <LastSentences
          sentences={lastSentences?.items || []}
          flippedSentenceId={flippedSentence?.id}
        />
        {lastSentences && (
          <Pagination
            currentPage={currentPage || 1}
            totalCount={lastSentences.totalCount}
            pageSize={lastSentences.pageSize}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default App;
