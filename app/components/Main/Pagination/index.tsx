import {ReactNode, useCallback, useMemo} from 'react';
import classes from './styles.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight
} from '@fortawesome/free-solid-svg-icons';
import {getPaginationNumbers} from './utils';

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange
}: PaginationProps): ReactNode {
  const paginationNumbers = useMemo(
    () => getPaginationNumbers(totalItems, itemsPerPage, currentPage),
    [currentPage, totalItems, itemsPerPage]
  );
  const {firstPage, lastPage} = paginationNumbers;

  const handlePageChange = useCallback(
    (page: number) => () => onPageChange(page),
    [onPageChange]
  );

  return (
    <div className={classes.pagination}>
      <ul>
        {currentPage > firstPage && (
          <li onClick={handlePageChange(1)}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </li>
        )}
        {currentPage > firstPage && (
          <li onClick={handlePageChange(currentPage - 1)}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </li>
        )}
        {paginationNumbers.pages.map(page => (
          <li
            key={page}
            onClick={handlePageChange(page)}
            className={page === currentPage ? classes.active : ''}
          >
            {page}
          </li>
        ))}
        {currentPage < lastPage && (
          <li onClick={handlePageChange(currentPage + 1)}>
            {' '}
            <FontAwesomeIcon icon={faAngleRight} />
          </li>
        )}
        {currentPage < lastPage && (
          <li onClick={handlePageChange(lastPage)}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </li>
        )}
      </ul>
    </div>
  );
}
