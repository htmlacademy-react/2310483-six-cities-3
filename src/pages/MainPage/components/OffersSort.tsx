import classnames from 'classnames';
import { useState } from 'react';
import { SortOption } from '../../../shared/api/type';

const SortOptions: SortOption[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

type OffersSortProps = {
  onSortChange: (sortOption: SortOption) => void;
  activeSort: SortOption;
}

const OffersSort = ({onSortChange, activeSort}: OffersSortProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleOffersSort = (sortOption: SortOption) => {
    if (sortOption === activeSort) {
      return;
    }
    onSortChange(sortOption);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={
          () => setIsOpened(!isOpened)
        }
      >
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={
        classnames(
          'places__options places__options--custom',
          {
            'places__options--opened': isOpened,
          }
        )
      }
      >
        {
          SortOptions.map((option) => (
            <li
              key={option} className={
                classnames(
                  'places__option',
                  {'places__option--active': option === activeSort},
                )
              }
              onClick={
                () => {
                  handleOffersSort(option);
                }
              }
              tabIndex={0}
            >
              {option}
            </li>
          ))
        }
      </ul>
    </form>
  );
};

export default OffersSort;
