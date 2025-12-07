import { useEffect, useRef, useCallback, ChangeEvent } from 'react';

interface OriginalSentenceProps {
  value: string;
  onChangeAction: (value: string) => void;
  refInputNode: (node: React.RefObject<HTMLTextAreaElement | null>) => void;
}

export default function OriginalSentence({
  value,
  onChangeAction,
  refInputNode,
}: OriginalSentenceProps) {
  const onChangeActionWrapper = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChangeAction(e.target.value);
    },
    [onChangeAction],
  );

  const inputNode = useRef<HTMLTextAreaElement>(null);

  useEffect(() => refInputNode(inputNode), [refInputNode]);

  return (
    <textarea
      id="original-sentence"
      className="w-full resize-none appearance-none border border-gray-pale p-[5px] font-arial placeholder-gray-light outline-none md:mx-auto md:mt-[50px]"
      rows={10}
      autoFocus
      placeholder="Type a sentence here"
      value={value}
      onChange={onChangeActionWrapper}
      ref={inputNode}
    />
  );
}
