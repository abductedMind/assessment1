import { formatDateByLang } from './date-formating';

export interface MovieListProps {
  rows: any[];
  currentPage: number;
  pageCount: number;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
}

export function MoviesList({
  rows,
  currentPage,
  pageCount,
  onClickPrevPage,
  onClickNextPage,
}: MovieListProps) {
  return (
    <div className={'card p-4 mt-4'}>
      <div className="fs-3 mb-4">
        Results ({currentPage} of {pageCount})
      </div>
      <div>
        <button className={'btn btn-primary me-4'} onClick={onClickPrevPage}>
          Prev
        </button>
        <button className={'btn btn-primary me-4'} onClick={onClickNextPage}>
          Next
        </button>
      </div>
      <div className={'mt-4 mb-4'}>
        <table className="table">
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
                  {formatDateByLang(row.release_date)}
                </td>
                <td className={'py-2 pe-2 align-top min-w-8'}>
                  {row.vote_average === 0 ? 'n/a' : row.vote_average}
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
    </div>
  );
}

export default MoviesList;
