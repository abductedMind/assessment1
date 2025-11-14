import { useEffect, useState } from 'react';

// const DETAULT_ITEMS_PER_PAGE = 20;

export interface PaginatedResponse<T = unknown> {
  page: string;
  results: T;
  total_pages: number;
  total_results: number;
}

export interface CollectionRow {
  id: string;
  original_title: string;
  poster_path: string;
  [prop: string]: string;
}

const API_KEY = '9084eae9f770e006ebcba95dbd474e28';

export function MoviesList() {
  const [rows, setRows] = useState<CollectionRow[]>([]);
  const [showJson, setShowJson] = useState<boolean>(false);
  const [apiResponseJson, setApiResponseJson] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  async function loadData(pageNumber: number) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${pageNumber}`
    );
    const paginatedResponse: PaginatedResponse<any> = await response.json();
    setCurrentPage(pageNumber);
    setApiResponseJson(paginatedResponse.results);
    setRows(paginatedResponse.results);
    setPageCount(paginatedResponse.total_pages);
    console.log('data loaded', pageNumber, paginatedResponse.total_pages);
  }

  useEffect(() => {
    loadData(1);
  }, []);

  function onClickLoad() {
    loadData(currentPage);
  }

  function onClickNextPage() {
    const pageNumber = currentPage + 1 > pageCount ? 1 : currentPage + 1;
    loadData(pageNumber);
  }

  function onClickPrevPage() {
    const pageNumber = currentPage <= 1 ? pageCount : currentPage - 1;
    loadData(pageNumber);
  }

  function onClickShowJson() {
    setShowJson(!showJson);
  }

  return (
    <div>
      <div className={'mb-5'}>
        <div className="text-xl mb-4">Actions</div>
        <button
          className={'px-2 me-4 py-1 border-1 rounded bg-gray-200'}
          onClick={onClickLoad}
        >
          Refresh Data
        </button>
        <button
          className={'px-2 me-4 py-1 border-1 rounded bg-gray-200'}
          onClick={onClickShowJson}
        >
          Toggle JSON
        </button>
      </div>
      <div className="text-xl mb-4">
        Results ({currentPage} of {pageCount})
      </div>
      <div>
        <button
          className={'px-2 me-4 py-1 border-1 rounded bg-gray-200'}
          onClick={onClickPrevPage}
        >
          Prev
        </button>
        <button
          className={'px-2 me-4 py-1 border-1 rounded bg-gray-200'}
          onClick={onClickNextPage}
        >
          Next
        </button>
      </div>
      <div className={'my-4'}>
        <table className="table-auto">
          <thead>
            <tr className={'font-bold align-top'}>
              <th className={'py-2 pe-2 border-b border-blue-gray-100'}>#</th>
              <th
                className={'py-2 pe-2 border-b border-blue-gray-100 min-w-28'}
              >
                title
              </th>
              <th className={'py-2 pe-2 border-b border-blue-gray-100'}>
                overview
              </th>
              <th
                className={'py-2 pe-2 border-b border-blue-gray-100 min-w-28'}
              >
                release date
              </th>
              <th
                className={'py-2 pe-2 border-b border-blue-gray-100 min-w-28'}
              >
                vote average
              </th>
              <th className={'py-2 border-b border-blue-gray-100 align-top'}>
                poster
              </th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, i) => (
              <tr key={row.id}>
                <td className={'py-2 pe-2 align-top'}>{i + 1}</td>

                <td className={'py-2 pe-2 align-top min-w-28'}>
                  {row.original_title}
                </td>
                <td className={'py-2 pe-2 align-top'}>{row.overview}</td>
                <td className={'py-2 pe-2 align-top min-w-28'}>
                  {row.release_date}
                </td>
                <td className={'py-2 pe-2 align-top min-w-8'}>
                  {row.vote_average}
                </td>
                <td className={'py-2 align-top'}>

                  <a
                    className={'text-blue-600'}
                    target={'_new'}
                    href={`https://image.tmdb.org/t/p/original/${row.poster_path}`}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w92/${row.poster_path}`}
                      alt={'poster'}
                    />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <div></div>
        {showJson ? (
          <>
            <h3 className={'text-xl'}>API JSON response</h3>
            <div>{JSON.stringify(apiResponseJson)}</div>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default MoviesList;
