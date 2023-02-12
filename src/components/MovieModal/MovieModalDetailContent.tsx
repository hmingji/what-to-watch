import ReactPlayer from 'react-player';
import { useMovieCreditQuery } from '../../hooks/useMovieCreditQuery';
import { useMovieDetailQuery } from '../../hooks/useMovieDetailQuery';
import { useMovieVideoQuery } from '../../hooks/useMovieVideoQuery';
import { MovieListItem } from '../../models/movieList';
import { setDetail, setPreview } from '../../slice/appSlice';
import { useAppDispatch } from '../../store/configureStore';
import { MdClose } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';

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
      <div className="w-full h-12 mb-5 relative">
        <button
          className="btn btn-circle absolute right-0"
          onClick={() => {
            dispatch(setDetail(false));
            dispatch(setPreview(false));
          }}
        >
          <MdClose />
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

        <div className="text-white border p-2 rounded-md max-w-[400px] xl:w-4/12 w-9/12 self-stretch">
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

        <div className="text-white border p-2 rounded-md max-w-[400px] xl:w-4/12 w-9/12 self-stretch">
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
                    <div className="mask mask-circle w-20 h-20 bg-slate-400 my-4 grid place-items-center">
                      <FaUser size="3rem" />
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
