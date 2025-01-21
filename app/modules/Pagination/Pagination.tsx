import styles from './Pagination.module.css';
import anglesRight from '../../../public/img/icons/angles-right.svg';
import angleRight from '../../../public/img/icons/angle-right.svg';
import Image from 'next/image';

interface Station {
  Municipio: string;
  Rótulo: string;
  'C.P.': string;
  Horario: string;
  Latitud: string;
  'Longitud (WGS84)': string;
  'Precio Gasoleo A': string;
  'Precio Gasoleo Premium': string;
  'Precio Gasolina 95 E5': string;
  'Precio Gasolina 98 E5': string;
}

type PaginationProps = {
  filteredStations: Station[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
};

/**
 * Generates an array of page numbers to be displayed in the pagination component.
 *
 * @param {number} totalItems - The total number of items.
 * @param {number} itemsPerPage - The number of items per page.
 * @param {number} currentPage - The current page number.
 * @param {number} [maxPageNumbers=5] - The maximum number of page numbers to display.
 * @returns {number[]} An array of page numbers to be displayed.
 */
const getPageNumbers = (
  totalItems: number,
  itemsPerPage: number,
  currentPage: number,
  maxPageNumbers: number = 5
): number[] => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const half = Math.floor(maxPageNumbers / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, currentPage + half);

  if (currentPage - half <= 0) {
    end = Math.min(totalPages, end + (half - currentPage + 1));
  }

  if (currentPage + half > totalPages) {
    start = Math.max(1, start - (currentPage + half - totalPages));
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

/**
 * Pagination component for navigating through a list of items.
 *
 * @param {PaginationProps} props - The props for the Pagination component.
 * @param {Station[]} props.filteredStations - The filtered list of stations.
 * @param {number} props.currentPage - The current page number.
 * @param {function} props.setCurrentPage - Function to set the current page number.
 * @param {number} props.itemsPerPage - The number of items per page.
 * @returns {JSX.Element} The Pagination component.
 */
export function Pagination({
  filteredStations,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}: PaginationProps): JSX.Element {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const pageNumbers = getPageNumbers(
    filteredStations.length,
    itemsPerPage,
    currentPage
  );

  return (
    <div className={styles.pagination}>
      <ul>
        {currentPage > 1 && (
          <li onClick={() => handlePageChange(1)}>
            <Image src={anglesRight} alt="" />
          </li>
        )}
        {currentPage > 1 && (
          <li onClick={() => handlePageChange(currentPage - 1)}>
            <Image src={angleRight} alt="" />
          </li>
        )}
        {pageNumbers.map((page) => (
          <li
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? styles.active : ''}
          >
            {page}
          </li>
        ))}
        {currentPage < Math.ceil(filteredStations.length / itemsPerPage) && (
          <li onClick={() => handlePageChange(currentPage + 1)}>
            {' '}
            <Image src={angleRight} alt="" />
          </li>
        )}
        {currentPage < Math.ceil(filteredStations.length / itemsPerPage) && (
          <li
            onClick={() =>
              handlePageChange(
                Math.ceil(filteredStations.length / itemsPerPage)
              )
            }
          >
            <Image src={anglesRight} alt="" />
          </li>
        )}
      </ul>
    </div>
  );
}
