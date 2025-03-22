type PaginationNumbers = {
  firstPage: number;
  pages: number[];
  lastPage: number;
};

export function getPaginationNumbers(
  totalItems: number,
  itemsPerPage: number,
  currentPage: number,
  maxPages: number = 5
): PaginationNumbers {
  const firstPage = 1;
  const lastPage = Math.ceil(totalItems / itemsPerPage);
  const half = Math.floor(maxPages / 2);
  const startingPage = Math.max(
    firstPage,
    Math.min(currentPage - half, lastPage - maxPages)
  );

  const pages = Array.from({length: maxPages}, (_, i) => startingPage + i);
  return {firstPage, pages, lastPage};
}
