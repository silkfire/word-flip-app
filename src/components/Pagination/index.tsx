import { memo } from 'react';
import clsx from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const DOTS = '...';

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}) => {
  const totalPageCount = Math.ceil(totalCount / pageSize);

  // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
  const totalPageNumbers = siblingCount + 5;

  /*
    Case 1:
    If the number of pages is less than the page numbers we want to show in our
    paginationComponent, we return the range [1..totalPageCount]
  */
  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPageCount,
  );

  /*
    We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
  */
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  /*
    Case 2: No left dots to show, but rights dots to be shown
  */
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, DOTS, totalPageCount];
  }

  /*
    Case 3: No right dots to show, but left dots to be shown
  */
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(
      totalPageCount - rightItemCount + 1,
      totalPageCount,
    );
    return [firstPageIndex, DOTS, ...rightRange];
  }

  /*
    Case 4: Both left and right dots to be shown
  */
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  return [];
};

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

function Pagination({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange
    ? paginationRange[paginationRange.length - 1]
    : 0;

  return (
    <ul className="mt-4 flex list-none justify-center select-none">
      <li
        className={clsx(
          'flex h-8 w-8 items-center justify-center rounded-full hover:cursor-pointer hover:bg-gray-200',
          currentPage === 1 && 'pointer-events-none opacity-50',
        )}
        onClick={onPrevious}
      >
        <div className="arrow left" />
        {/* Left Arrow SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </li>
      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={index}
              className="flex h-8 w-8 items-center justify-center"
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={index}
            className={clsx(
              'mx-1 flex h-8 w-8 items-center justify-center rounded-full text-sm',
              pageNumber === currentPage
                ? 'bg-blue-sky text-white'
                : 'hover:cursor-pointer hover:bg-gray-200',
            )}
            onClick={() => {
              if (pageNumber !== currentPage) {
                onPageChange(Number(pageNumber));
              }
            }}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={clsx(
          'flex h-8 w-8 items-center justify-center rounded-full hover:cursor-pointer hover:bg-gray-200',
          currentPage === lastPage && 'pointer-events-none opacity-50',
        )}
        onClick={onNext}
      >
        <div className="arrow right" />
        {/* Right Arrow SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </li>
    </ul>
  );
}

export default memo(Pagination);
