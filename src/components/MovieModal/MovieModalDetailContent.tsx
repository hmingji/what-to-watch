import ReactPlayer from 'react-player';
import { useMovieCreditQuery } from '../../hooks/useMovieCreditQuery';
import { useMovieDetailQuery } from '../../hooks/useMovieDetailQuery';
import { useMovieVideoQuery } from '../../hooks/useMovieVideoQuery';
import { MovieListItem } from '../../models/movieList';
import { setDetail, setPreview } from '../../slice/appSlice';
import { useAppDispatch } from '../../store/configureStore';

interface Props {
  movieItem: MovieListItem;
}

export default function MovieModalDetailContent({ movieItem }: Props) {
  const { data: movieDetail } = useMovieDetailQuery(movieItem.id, true);
  const { data: movieVideo } = useMovieVideoQuery(movieItem.id, true);
  const { data: movieCredit } = useMovieCreditQuery(movieItem.id, true);
  const dispatch = useAppDispatch();
  const ytMovieVideo = movieVideo?.results.filter(
    (video) => video.site === 'YouTube'
  );

  return (
    <>
      <div className="w-full flex flex-row-reverse mb-5">
        <button
          className="btn btn-circle"
          onClick={() => {
            dispatch(setDetail(false));
            dispatch(setPreview(false));
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-5 items-center">
        <div className="max-w-[400px] xl:w-4/12 w-9/12 flex-none">
          {movieDetail?.poster_path ? (
            <figure>
              <img
                src={`${process.env.REACT_APP_MOVIEIMAGEAPI_URL}w500${movieDetail?.poster_path}`}
                alt={movieDetail?.title}
                className="rounded-md"
              />
            </figure>
          ) : null}
        </div>
        <div className="max-w-[400px] xl:w-4/12 w-9/12 flex-none my-auto text-white">
          <h1 className="text-2xl mb-2">{movieDetail?.title}</h1>
          <p className=" text-base mb-2">{movieDetail?.tagline}</p>
          <p>{`Status: ${movieDetail?.status.toUpperCase()}`}</p>
          <p>{`Runtime: ${movieDetail?.runtime} mins`}</p>
          <p>{`Release Date: ${movieDetail?.release_date}`}</p>
          {movieDetail?.genres.map((genre) => (
            <div
              key={genre.id}
              className="badge badge-sm badge-primary mr-1 mb-1 "
            >
              {genre.name}
            </div>
          ))}
          <p className="mt-5 text-sm">{movieDetail?.overview}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 justify-center mt-5">
        <div className="text-white border p-2 rounded-md max-w-[400px] xl:w-4/12 w-9/12">
          <h1 className="text-2xl mb-2">Related Videos</h1>
          <div className="w-full max-h-[670px] h-fit overflow-auto">
            {ytMovieVideo?.length === 0 ? (
              <p className="text-white text-sm">N/A</p>
            ) : (
              ytMovieVideo?.map((video) => (
                <div
                  key={video.key}
                  className="w-full aspect-video mb-2"
                >
                  <ReactPlayer
                    key={video.key}
                    url={`https://www.youtube.com/watch?v=${video.key}`}
                    width="100%"
                    height="100%"
                    controls
                    playsinline={false}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className="text-white border p-2 rounded-md max-w-[400px] xl:w-4/12 w-9/12">
          <h1 className="text-2xl mb-2">Casts</h1>
          <div className="w-full max-h-[670px] h-fit overflow-auto">
            {movieCredit?.cast.length === 0 ? (
              <p className="text-white text-sm">N/A</p>
            ) : (
              movieCredit?.cast.map((cast) => (
                <li
                  key={cast.cast_id}
                  className="flex items-center gap-4"
                >
                  {cast.profile_path ? (
                    <img
                      className="mask mask-circle w-20"
                      src={`${process.env.REACT_APP_MOVIEIMAGEAPI_URL}w500${cast.profile_path}`}
                    />
                  ) : (
                    <div className="mask mask-circle w-20 h-20 bg-slate-400 my-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="w-20 h-20 p-5"
                      >
                        {/* //Font Awesome Pro 6.2.0 by @fontawesome -
                      https://fontawesome.com License -
                      https://fontawesome.com/license (Commercial License)
                      Copyright 2022 Fonticons, Inc. */}
                        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                      </svg>
                    </div>
                  )}
                  <p className="pl-1">{cast.name}</p>
                </li>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
