import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';

import { flip, getLastSentences } from '@/shared/api';

import FadeWrapper from '../FadeWrapper';
import OriginalSentence from '../OriginalSentence';
import FlipButton from '../Button';
import FlipSentenceSpinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import FlippedSentence from '../FlippedSentence';
import LastSentencesLoader from '../Loader';
import LastSentences from '../LastSentences';

const MAX_SENTENCE_COUNT = 10;

interface Sentence {
  id: string;
  value: string;
  created: string;
}

const App = () => {
  const [lastSentences, setLastSentences] = useState<Sentence[]>([]);
  const [originalSentence, setOriginalSentence] = useState('');
  const [originalSentenceInputNode, setOriginalSentenceInputNode] = useState<
    React.RefObject<HTMLTextAreaElement | null> | undefined
  >(undefined);
  const [isLoadingLastSentences, setLoadingStateLastSentences] = useState(true);
  const [isFlipping, setFlippingState] = useState(false);
  const [flippedSentence, setFlippedSentence] = useState<Sentence | undefined>(
    undefined,
  );
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

    flip(originalSentence)
      .then((data: Sentence) => {
        setOriginalSentence('');

        if (flippedSentence !== undefined)
          setLastSentences(
            [flippedSentence, ...lastSentences].slice(0, MAX_SENTENCE_COUNT),
          );
        setFlippedSentence(data);

        originalSentenceInputNode?.current?.focus();
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
  ]);

  useEffect(() => {
    getLastSentences()
      .then((data: Sentence[]) => {
        setErrorMessage(undefined);
        setLastSentences(data.slice(0, MAX_SENTENCE_COUNT));
      })
      .catch(() => {
        setErrorMessage('The WordFlip API service is currently offline.');
      })
      .finally(() => {
        setLoadingStateLastSentences(false);
      });
  }, []);

  return (
    <div className="mx-auto w-full md:w-[590px]">
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
              className="ml-auto w-[80px]"
            />
          </FadeWrapper>
        </div>

        <div
          className={clsx(
            'overflow-hidden',
            flippedSentence !== undefined ? 'h-auto' : 'h-0',
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
          sentences={lastSentences}
          flippedSentenceId={flippedSentence && flippedSentence.id}
        />
      </div>
    </div>
  );
};

export default App;
