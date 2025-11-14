import { useState } from 'react';
import { CollectionRow, PaginatedResponse } from './movies.model';
import { API_KEY } from './movies.constants';
import MovieList from './movie-list';

export function MoviesSearch() {
  const [rows, setRows] = useState<CollectionRow[]>([]);
  const [showJson, setShowJson] = useState<boolean>(false);
  const [apiResponseJson, setApiResponseJson] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  async function loadData(pageNumber: number) {
    const getUrl =
      `https://api.themoviedb.org/3/search/movie?` +
      `query=${encodeURIComponent(searchText)}` +
      `&api_key=${API_KEY}` +
      `&page=${pageNumber}`;
    const response = await fetch(getUrl);
    const paginatedResponse: PaginatedResponse<any> = await response.json();
    setCurrentPage(pageNumber);
    setApiResponseJson(paginatedResponse.results);
    setRows(paginatedResponse.results);
    setPageCount(paginatedResponse.total_pages);
    console.log('data loaded', pageNumber, paginatedResponse.total_pages);
  }

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

  function onClickSearch() {
    loadData(1);
  }

  return (
    <div>
      <div className={'my-4 align-middle'}>
        <div className={'mb-2'}>Search for movies (fuzzy results provided)</div>
        <input
          className={'me-2'}
          name={'searchText'}
          type={'text'}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Enter search text..."
        ></input>
        <button
          type="button"
          className="btn btn-primary btn-sm mb-1"
          onClick={onClickSearch}
        >
          Search
        </button>
      </div>

      <div className={'my-3'}>Current search text: "{searchText}"</div>

      {rows?.length === 0 && <div>No data</div>}
      {rows?.length > 0 && (
        <MovieList
          rows={rows}
          currentPage={currentPage}
          pageCount={pageCount}
          onClickNextPage={onClickNextPage}
          onClickPrevPage={onClickPrevPage}
        ></MovieList>
      )}

      <div className={''}>
        <div className="fs-3 mt-4">Actions</div>
        <button className={'btn btn-primary me-4'} onClick={onClickLoad}>
          Refresh Data
        </button>
        <button className={'btn btn-primary me-4'} onClick={onClickShowJson}>
          Toggle JSON
        </button>
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

export default MoviesSearch;
