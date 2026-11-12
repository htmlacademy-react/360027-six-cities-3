import { memo, useRef, useState } from 'react';
import clsx from 'clsx';
import { SortType } from '@/const';
import useAppDispatch from '@/hooks/use-app-dispatch';
import useAppSelector from '@/hooks/use-app-selector';
import useOutsideClick from '@/hooks/use-outside-click';
import { sortTypeChange } from '@/store/app-process/app-process';
import { selectSortType } from '@/store/app-process/selectors';
import { SortTypeDictionary } from './const';

function Sorting(): JSX.Element {
  const activeSortType = useAppSelector(selectSortType);
  const dispatch = useAppDispatch();
  const [isOpened, setIsOpened] = useState(false);
  const sortingRef = useRef<HTMLFormElement | null>(null);

  const handleSortTypeClick = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  const handleOptionClick = (sortType: SortType) => {
    dispatch(sortTypeChange(sortType));
    setIsOpened(false);
  };

  const handleOutsideClick = () => {
    setIsOpened(false);
  };

  useOutsideClick(sortingRef, handleOutsideClick);

  return (
    <form className="places__sorting" action="#" method="get" ref={sortingRef}>
      <span className="places__sorting-caption">Sort by</span>{' '}
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortTypeClick}
      >
        {SortTypeDictionary[activeSortType]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={clsx('places__options places__options--custom', {
          'places__options--opened': isOpened,
        })}
      >
        {Object.values(SortType).map((sortType) => (
          <li
            className={clsx('places__option', {
              'places__option--active': sortType === activeSortType,
            })}
            key={sortType}
            tabIndex={0}
            onClick={() => handleOptionClick(sortType)}
          >
            {SortTypeDictionary[sortType]}
          </li>
        ))}
      </ul>
    </form>
  );
}

const MemoizedSorting = memo(Sorting);

export default MemoizedSorting;
